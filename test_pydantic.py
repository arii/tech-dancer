from typing import Dict, Any, Type, Literal
from pydantic import BaseModel, ConfigDict
from pydantic.json_schema import GenerateJsonSchema, JsonSchemaValue
from pydantic_core import core_schema

class MCPGenerateJsonSchema(GenerateJsonSchema):
    def handle_integer_schema(self, schema: core_schema.IntSchema) -> JsonSchemaValue:
        json_schema = super().handle_integer_schema(schema)
        print(f"DEBUG: handled integer, old type: {json_schema.get('type')}")
        json_schema['type'] = 'number'
        return json_schema

    def field_title_should_be_set(self, schema: core_schema.CoreSchema) -> bool:
        return False

class BaseContract(BaseModel):
    @classmethod
    def model_json_schema(
        cls,
        by_alias: bool = True,
        ref_template: str = "#/$defs/{model}",
        schema_generator: Type[GenerateJsonSchema] = MCPGenerateJsonSchema,
        mode: Literal['validation', 'serialization'] = 'validation',
    ) -> Dict[str, Any]:
        return super().model_json_schema(
            by_alias=by_alias,
            ref_template=ref_template,
            schema_generator=schema_generator,
            mode=mode
        )

class TestModel(BaseContract):
    val: int

print(TestModel.model_json_schema())
