import json
import docx
import io


class ReadUtility:
    def __init__(self, origin):
        self.origin = origin

    def read_docx_file(self):
        doc = docx.Document(io.BytesIO(self.origin.file))
        text = ''
        for p in doc.paragraphs:
            text += p.text + '\n'
        text = text.strip()
        return text

    def read_json_file(self):
        dict_json = json.loads(self.origin.file)
        text = [v for k, v in dict_json.items()][0]
        return text

    def read_txt_file(self):
        return self.origin.file.decode('utf-8')
