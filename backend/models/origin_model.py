from enum import Enum
from typing import Union, Optional
from backend.models.input_model import TextObject, FileObject, bytes_type
from backend.utilities.read_utility import ReadUtility


class FileTypeModel(Enum):
    DOCX: str = 'docx'
    JSON: str = 'json'
    TXT: str = 'txt'


class OriginModel(Enum):
    TEXT: Optional[str] = 'text'
    FILE: Optional[str] = 'file'


class Origin:
    def __init__(self):
        self.ReadUtility = ReadUtility(self)
        self.file_content = None
        self.translate_object = None
        self.text = None
        self.file = None
        self.file_type = None

    def set_origin(self, origin: OriginModel, translate_object: Union[TextObject, FileObject]):
        self.translate_object = translate_object
        if origin == OriginModel.TEXT and isinstance(translate_object, TextObject):
            self.text = translate_object.text
        elif origin == OriginModel.FILE and isinstance(translate_object, FileObject):
            self.file = translate_object.file
            self.file_type = self._get_file_type()
        else:
            raise Exception('Origem inválida')

    def _get_file_type(self):
        if self.translate_object.file_extension == FileTypeModel.DOCX.value:
            self.file_content = self.ReadUtility.read_docx_file()
            return FileTypeModel.DOCX
        elif self.translate_object.file_extension == FileTypeModel.JSON.value:
            self.file_content = self.ReadUtility.read_json_file()
            return FileTypeModel.JSON
        elif self.translate_object.file_extension == FileTypeModel.TXT.value:
            self.file_content = self.ReadUtility.read_txt_file()
            return FileTypeModel.TXT
        else:
            raise Exception('Formato de arquivo não suportado')
