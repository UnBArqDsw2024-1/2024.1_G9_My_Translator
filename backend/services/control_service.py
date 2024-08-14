from backend.models.input_model import TextObject, FileObject
from backend.models.origin_model import Origin, OriginModel


class ControlService:
    def __init__(self, origin_obj: Origin):
        if origin_obj.text:
            print('TEXTO')
            print(origin_obj.text)
        else:
            print('ARQUIVO')
            print(origin_obj.file_type.value)
            print(origin_obj.file_content)
        #self.deepl_service = DeeplService(origin)
        #self.historic_service = HistoricService(origin)


if __name__ == '__main__':
    # Exemplos de uso
    origin = Origin()
    text = TextObject(text='Hello world!')
    origin.set_origin(OriginModel.TEXT, text)
    ControlService(origin)

    origin = Origin()
    with open('../teste/teste.txt', 'rb') as f:
        file_extension = f.name.split('.')[-1]
        file = FileObject(file=f.read(), file_extension=file_extension)
    origin.set_origin(OriginModel.FILE, file)
    ControlService(origin)

    origin = Origin()
    with open('../teste/teste.docx', 'rb') as f:
        file_extension = f.name.split('.')[-1]
        file = FileObject(file=f.read(), file_extension=file_extension)
    origin.set_origin(OriginModel.FILE, file)
    ControlService(origin)

    origin = Origin()
    with open('../teste/teste.json', 'rb') as f:
        file_extension = f.name.split('.')[-1]
        file = FileObject(file=f.read(), file_extension=file_extension)
    origin.set_origin(OriginModel.FILE, file)
    ControlService(origin)