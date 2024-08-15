from backend.models.input_model import TextObject, FileObject
from backend.models.origin_model import Origin, OriginModel
from backend.services.deepl_service import DeeplService


class ControlService(DeeplService):
    def __init__(self, origin_obj: Origin):
        super().__init__()
        self.origin_obj = origin_obj
        if origin_obj.text:
            translated_text = self.translate_text(origin_obj.text)
        elif origin_obj.file:  # Validar
            print('ARQUIVO')
            print(origin_obj.file_type.value)
            print(origin_obj.file_content)
            translated_text = self.translate_text(origin_obj.file_content)
        else:
            raise NotImplementedError('Origem inválida')

        self.translate_text = translated_text


# if __name__ == '__main__':
#     # Exemplos de uso
#     origin = Origin()
#     text = TextObject(text='Hello world!')
#     origin.set_origin(OriginModel.TEXT, text)
#     ControlService(origin)
#
#     origin = Origin()
#     with open('../teste/teste.txt', 'rb') as f:
#         file_extension = f.name.split('.')[-1]
#         file = FileObject(file=f.read(), file_extension=file_extension)
#     origin.set_origin(OriginModel.FILE, file)
#     ControlService(origin)
#
#     origin = Origin()
#     with open('../teste/teste.docx', 'rb') as f:
#         file_extension = f.name.split('.')[-1]
#         file = FileObject(file=f.read(), file_extension=file_extension)
#     origin.set_origin(OriginModel.FILE, file)
#     ControlService(origin)
#
#     origin = Origin()
#     with open('../teste/teste.json', 'rb') as f:
#         file_extension = f.name.split('.')[-1]
#         file = FileObject(file=f.read(), file_extension=file_extension)
#     origin.set_origin(OriginModel.FILE, file)
#     ControlService(origin)