// @id R0ATB6R7YodZO86IwIsoMi
class StringInput extends System.Control {
  constructor() {
    super();

    this.datatype = "string";

    this.template = `
      <v-text-field
        class         = "tabula"
        v-model       = "record[field.options.id]"
        :label        = "field.options.label"
        :hint         = "field.options.hint"
        :prepend-icon = "field.options.icon"
        @change       = "onChange"
      ></v-text-field>
    `;

    this.methods = {
      onChange() {
        this.$emit('change');
      }
    }
  }
}