import deepl
from typing import Union, Iterable, Tuple, List

from backend.models.deepl_constants import DE_PARA_TARGET, DE_PARA_SOURCE
from backend.utilities.aws_utility import AwsUtility

import logging as log

log.basicConfig(level=log.INFO)

aws_utility = AwsUtility()
api_key = aws_utility.init_service('ssm').get_parameter(Name='deepl_api_key')['Parameter']['Value']


class DeeplService:
    def __init__(self):
        self.base_url = 'https://api-free.deepl.com/v2'
        self.api_key = api_key
        self.translator = deepl.Translator(self.api_key)
        self.de_para_target = DE_PARA_TARGET
        self.de_para_source = DE_PARA_SOURCE

    @staticmethod
    def health_check():
        log.info(f"Deepl usage: {deepl.Translator(api_key).get_usage()}")


    def get_supported_languages(self):
        target_languages = self.translator.get_target_languages()
        self.de_para_code_target = {l.name: l.code for l in target_languages}
        source_languages = self.translator.get_source_languages()
        self.de_para_code_source = {l.name: l.code for l in source_languages}


    def translate_text(self, text: Union[str, Iterable[str]], source_lang: str = 'EN', target_lang: str = 'PT-BR'):
        try:
            text = self.translator.translate_text(
                text,
                source_lang=source_lang,
                target_lang=target_lang,
                formality=deepl.Formality.DEFAULT
            )
            self.health_check()
            return text
        except AssertionError as e:
            log.critical(e)
            return None

if __name__ == '__main__':
    # Exemplo de uso
    deepl_service = DeeplService()
    deepl_service.get_suported_languages()
