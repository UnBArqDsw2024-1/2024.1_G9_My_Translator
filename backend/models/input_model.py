from io import BytesIO
from typing import Union, Any
from pydantic import BaseModel, Extra


bytes_type = Union[bytes, BytesIO]


class TextObject(BaseModel, extra=Extra.forbid):
    text: str


class FileObject(BaseModel, extra=Extra.forbid, arbitrary_types_allowed=True):
    file: bytes_type
    file_extension: str
