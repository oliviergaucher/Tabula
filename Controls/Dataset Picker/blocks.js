// @id jDdDdtTei8ON59O0SNTLks
class DatasetPicker extends System.Control {
  constructor() {
    super();

    this.datatype = "object";

    this.template = `
      <v-text-field
        class         = "tabula"
        v-model       = "record[field.options.id].list[0]"
        :label        = "field.options.label"
        :hint         = "field.options.hint"
        :prepend-icon = "field.options.icon"
        @change       = "onChange"
      ></v-text-field>
    `;

    this.methods = {
      onChange(value) {
        this.record[this.field.options.id] = { type: 'url', list: [value] };
        this.$emit('change');
      }
    }
  }
}