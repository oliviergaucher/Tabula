// @id ImvTnkV9aW7vsaBPwJD5XY
class ColumnPicker extends System.Control {
  constructor() {
    super();

    this.datatype = "array";

    this.template = `
      <v-select clearable multiple return-object chips small-chips
        class         = "tabula"
        v-model       = "record[field.options.id].list"
        :items        = "field.options.options.context.meta.columns"
        item-text     = "name"
        item-value    = "name"
        :label        = "field.options.label"
        :hint         = "field.options.hint"
        :prepend-icon = "field.options.icon"
        @change       = "onChange"
      ></v-select>
    `;

    this.methods = {
      onChange() {
        this.$emit('change');
      }
    }
  }
}