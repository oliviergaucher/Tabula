// @id oQtrLdkUbezvVxHf9rzCOz
class FrameEditor extends System.Control {
  constructor() {
    super();

    this.datatype = "object";
    
    this.template = `
      <div>
        <v-text-field clearable
          class         = "tabula"
          v-model       = "record[field.options.id].start"
          label         = "Frame start"
          hint          = "Frame start"
          prepend-icon  = "mdi-contain-start"
          @change       = "onStartChange"
        ></v-text-field>
        <v-text-field clearable
          class         = "tabula"
          v-model       = "record[field.options.id].end"
          label         = "Frame end"
          hint          = "Frame end"
          prepend-icon  = "mdi-contain-end"
          @change       = "onEndChange"
        ></v-text-field>
      </div>
    `;

    this.methods = {
      onStartChange(value) {
        this.record[this.field.options.id].start = value;
        this.$emit('change');
      },
      onEndChange(value) {
        this.record[this.field.options.id].end = value;
        this.$emit('change');
      }
    }
  }
}