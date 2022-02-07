// @id i5ozv37yhQ8OybOVd0yXlq
class IntegerInput extends System.Control {
  constructor() {
    super();

    this.datatype = "integer";

    this.template = `
      <v-text-field clearable
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