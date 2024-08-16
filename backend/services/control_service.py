from models.origin_model import Origin
from services.deepl_service import DeeplService


class ControlService:
    def __init__(self, origin_obj: Origin, deepl_service: DeeplService):
        self.origin_obj = origin_obj
        if origin_obj.text:
            translated_text = deepl_service.translate_text(origin_obj.text, origin_obj.source_language, origin_obj.target_language)
        elif origin_obj.file:  # Validar
            print('ARQUIVO')
            print(origin_obj.file_type.value)
            print(origin_obj.file_content)
            translated_text = deepl_service.translate_text(origin_obj.file_content)
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