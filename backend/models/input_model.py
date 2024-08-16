from io import BytesIO
from typing import Union, Any
from pydantic import BaseModel, Extra

bytes_type = Union[bytes, BytesIO]


class LanguageModel(BaseModel, extra=Extra.forbid, arbitrary_types_allowed=True):
    source_language: str
    target_language: str


class TextObject(LanguageModel):
    text: str


class FileObject(LanguageModel):
    file: bytes_type
    file_extension: str
