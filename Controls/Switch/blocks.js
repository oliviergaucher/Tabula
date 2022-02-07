// @id Vv2vLqTK0kEU9VsvsHUvqC
class SwitchToggle extends System.Control {
  constructor() {
    super();

    this.datatype = "boolean";

    this.template = `
      <v-switch
        class         = "tabula"
        v-model       = "record[field.options.id]"
        :label        = "field.options.label"
        :hint         = "field.options.hint"
        color         = "grey"
        @change       = "onChange"
      ></v-switch>
    `;

    this.methods = {
      onChange() {
        this.$emit('change');
      }
    }
  }
}