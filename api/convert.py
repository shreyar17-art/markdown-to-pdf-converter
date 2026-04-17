from http.server import BaseHTTPRequestHandler
import json
import re

from markdown import markdown

def load_backend(backend_preference):
    first_error = None

    if backend_preference in ("weasyprint", "auto"):
        try:
            from weasyprint import HTML
            return "weasyprint", HTML
        except (ImportError, OSError) as exc:
            if backend_preference == "weasyprint":
                raise RuntimeError(f"WeasyPrint import failed: {exc}") from exc
            first_error = exc

    if backend_preference in ("fpdf", "auto"):
        try:
            from fpdf import FPDF
            return "fpdf", FPDF
        except ImportError as exc:
            if backend_preference == "fpdf":
                raise RuntimeError(f"fpdf2 import failed: {exc}") from exc
            first_error = first_error or exc

    raise RuntimeError(f"No PDF backend available. Last error: {first_error}")

DEFAULT_CSS = """
body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.5;
    margin: 1.25in;
    color: #202124;
}
code, pre {
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
}
pre {
    background: #f4f4f4;
    padding: 0.75rem;
    overflow-x: auto;
}
img {
    max-width: 100%;
}
h1, h2, h3, h4, h5, h6 {
    color: #111827;
}
blockquote {
    border-left: 4px solid #cbd5e1;
    margin: 1.5em 0;
    padding-left: 1em;
    color: #475569;
}
"""

HTML_TMPL = """<!DOCTYPE html>
<html lang=\"en\">
<head>
<meta charset=\"utf-8\">
<title>{title}</title>
<style>
{css}
</style>
</head>
<body>
{body}
</body>
</html>
"""

def parse_margin(margin_text):
    margin_text = margin_text.strip().lower()
    if margin_text.endswith("in"):
        return float(margin_text[:-2]) * 25.4
    if margin_text.endswith("mm"):
        return float(margin_text[:-2])
    if margin_text.endswith("cm"):
        return float(margin_text[:-2]) * 10.0
    if margin_text.endswith("pt"):
        return float(margin_text[:-2]) * 0.352778
    return float(margin_text)

def render_html(markdown_text, css_text, title):
    html_body = markdown(markdown_text, extensions=["extra", "fenced_code", "tables", "toc"])
    return HTML_TMPL.format(title=title, css=css_text, body=html_body)

def build_css(css_text, page_size, margin):
    page_css = f"@page {{ size: {page_size}; margin: {margin}; }}"
    return page_css + "\n" + css_text

def write_styled_text(pdf, text):
    if not text:
        return

    parts = re.split(r"(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^\)]+\))", text)
    for part in parts:
        if not part:
            continue

        if part.startswith("**") and part.endswith("**"):
            pdf.set_font("Helvetica", style="B", size=11)
            try:
                pdf.write(5, part[2:-2])
            except Exception as e:
                if 'Unicode' in str(e) or 'encode' in str(e):
                    safe_part = re.sub(r'[^\x00-\x7F]+', '[?]', part[2:-2])
                    pdf.write(5, safe_part)
                else:
                    raise
            pdf.set_font("Helvetica", size=11)
            continue

        if part.startswith("*") and part.endswith("*"):
            pdf.set_font("Helvetica", style="I", size=11)
            try:
                pdf.write(5, part[1:-1])
            except Exception as e:
                if 'Unicode' in str(e) or 'encode' in str(e):
                    safe_part = re.sub(r'[^\x00-\x7F]+', '[?]', part[1:-1])
                    pdf.write(5, safe_part)
                else:
                    raise
            pdf.set_font("Helvetica", size=11)
            continue

        if part.startswith("`") and part.endswith("`"):
            pdf.set_font("Courier", size=9)
            try:
                pdf.write(5, part[1:-1])
            except Exception as e:
                if 'Unicode' in str(e) or 'encode' in str(e):
                    safe_part = re.sub(r'[^\x00-\x7F]+', '[?]', part[1:-1])
                    pdf.write(5, safe_part)
                else:
                    raise
            pdf.set_font("Helvetica", size=11)
            continue

        link_match = re.match(r"^\[([^\]]+)\]\(([^\)]+)\)$", part)
        if link_match:
            pdf.set_text_color(0, 0, 255)
            pdf.set_font("Helvetica", style="U", size=11)
            try:
                pdf.write(5, link_match.group(1))
            except Exception as e:
                if 'Unicode' in str(e) or 'encode' in str(e):
                    safe_part = re.sub(r'[^\x00-\x7F]+', '[?]', link_match.group(1))
                    pdf.write(5, safe_part)
                else:
                    raise
            pdf.set_font("Helvetica", size=11)
            pdf.set_text_color(0, 0, 0)
            try:
                pdf.write(5, f" ({link_match.group(2)})")
            except Exception as e:
                if 'Unicode' in str(e) or 'encode' in str(e):
                    safe_part = re.sub(r'[^\x00-\x7F]+', '[?]', f" ({link_match.group(2)})")
                    pdf.write(5, safe_part)
                else:
                    raise
            continue

        try:
            pdf.write(5, part)
        except Exception as e:
            if 'Unicode' in str(e) or 'encode' in str(e):
                # Replace unsupported Unicode characters with placeholders
                safe_part = re.sub(r'[^\x00-\x7F]+', '[?]', part)
                pdf.write(5, safe_part)
            else:
                raise

def render_markdown_to_pdf(pdf, markdown_text):
    in_code_block = False
    for line in markdown_text.splitlines():
        if line.startswith("```"):
            in_code_block = not in_code_block
            pdf.ln(4)
            continue

        if in_code_block:
            pdf.set_font("Courier", size=9)
            pdf.multi_cell(0, 5, line)
            continue

        if not line.strip():
            pdf.ln(4)
            continue

        blockquote = re.match(r"^>\s+(.*)", line)
        if blockquote:
            pdf.set_font("Helvetica", style="I", size=11)
            pdf.set_x(pdf.l_margin + 5)
            write_styled_text(pdf, blockquote.group(1).strip())
            pdf.set_x(pdf.l_margin)
            pdf.ln(1)
            pdf.set_font("Helvetica", size=11)
            continue

        heading = re.match(r"^(#{1,6})\s+(.*)", line)
        if heading:
            size = max(18 - (len(heading.group(1)) - 1) * 2, 12)
            pdf.set_font("Helvetica", style="B", size=size)
            pdf.cell(0, 6, heading.group(2).strip(), new_x="LMARGIN", new_y="NEXT")
            pdf.ln(2)
            pdf.set_font("Helvetica", size=11)
            continue

        list_item = re.match(r"^([-*+])\s+(.*)", line)
        if list_item:
            pdf.set_font("Helvetica", size=11)
            pdf.cell(4, 6, "-")
            write_styled_text(pdf, list_item.group(2).strip())
            pdf.ln(6)
            continue

        pdf.set_font("Helvetica", size=11)
        write_styled_text(pdf, line)
        pdf.ln(6)

def write_pdf(content, backend_name, backend_module, page_size="A4", margin="1in", title="Markdown Document"):
    if backend_name == "weasyprint":
        css_text = build_css(DEFAULT_CSS, page_size, margin)
        html = render_html(content, css_text, title)
        return backend_module(string=html).write_pdf()

    if backend_name == "fpdf":
        margin_mm = parse_margin(margin)
        pdf = backend_module(format=page_size)
        pdf.set_title(title)
        pdf.set_margins(margin_mm, margin_mm, margin_mm)
        pdf.set_auto_page_break(auto=True, margin=margin_mm)
        pdf.add_page()
        render_markdown_to_pdf(pdf, content)

        result = pdf.output()
        if isinstance(result, (bytes, bytearray)):
            return bytes(result)
        return result.encode("latin-1")

    raise RuntimeError(f"Unsupported backend: {backend_name}")

def convert_markdown_to_pdf(markdown_text, page_size='A4', margin='1in'):
    backend_name, backend_module = load_backend("auto")
    return write_pdf(markdown_text, backend_name, backend_module, page_size=page_size, margin=margin)

class handler(BaseHTTPRequestHandler):

    def _send_json(self, status, data):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            raw = self.rfile.read(content_length)
            body = json.loads(raw)
        except (json.JSONDecodeError, ValueError):
            self._send_json(400, {'error': 'Invalid JSON body'})
            return

        markdown_text = body.get('markdown', '')
        page_size = body.get('page_size', 'A4')
        margin = body.get('margin', '1in')

        if not markdown_text.strip():
            self._send_json(400, {'error': 'No markdown content provided'})
            return

        try:
            pdf_bytes = convert_markdown_to_pdf(markdown_text, page_size=page_size, margin=margin)
        except Exception as e:
            self._send_json(500, {'error': str(e)})
            return

        self.send_response(200)
        self.send_header('Content-Type', 'application/pdf')
        self.send_header('Content-Disposition', 'attachment; filename="converted.pdf"')
        self.send_header('Content-Length', str(len(pdf_bytes)))
        self.end_headers()
        self.wfile.write(pdf_bytes)

    def do_GET(self):
        self._send_json(405, {'error': 'Method not allowed'})

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Allow', 'POST, OPTIONS')
        self.end_headers()