import json
from typing import Dict, List

from fastapi import APIRouter, Request, HTTPException

from models.input_model import TextObject
from models.origin_model import Origin, OriginModel
from services.control_service import ControlService
from services.deepl_service import DeeplService

translation_router = APIRouter(prefix="/translate")
deepl_service = DeeplService()
deepl_service.get_supported_languages()


@translation_router.post("/text",
                         description="Traduz um texto de uma língua para outra",
                         tags=["Translation"],
                         status_code=200,
                         response_model=TextObject)
async def translate_by_text(request_object: TextObject):
    try:
        origin = Origin()
        text_object = TextObject(
            text=request_object.text,
            source_language=request_object.source_language,
            target_language=request_object.target_language)
        origin.set_origin(OriginModel.TEXT, text_object)
        control_service = ControlService(origin, deepl_service)
        translated_text = control_service.translate_text.text  # É possível buscar a lingua detectada pelo objeto translated_text do Deepl
        return TextObject(text=translated_text,
                          source_language=request_object.source_language,
                          target_language=request_object.target_language)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao traduzir texto: {e}")


@translation_router.get("/languages_supported",
                         description="Busca as línguas suportadas pelo serviço de tradução",
                         tags=["Translation"],
                         status_code=200,
                         response_model=List[Dict[str, str]])
async def translate_by_text():
    try:
        return [deepl_service.de_para_source, deepl_service.de_para_target]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao traduzir texto: {e}")
