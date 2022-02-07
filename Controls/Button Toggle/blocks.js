// @id SIF9OjV7LtR7ZfN8t4RZYY
class ButtonToggle extends System.Control {
  constructor() {
    super();

    this.datatype = "string";

    this.template = `
      <v-btn-toggle dense
        class         = "tabula"
        v-model       = "record[field.options.id]"
        :label        = "field.options.label"
        :hint         = "field.options.hint"
        @change       = "onChange"
      >
        <v-btn v-for="item in field.options.options.items" :value="item.id">
          <v-icon left style="margin-top: -2px;">
            {{ item.icon }}
          </v-icon>
          <span class="hidden-sm-and-down">{{ item.name }}</span>
        </v-btn>
      </v-btn-toggle>
    `;

    this.methods = {
      onChange() {
        this.$emit('change');
      }
    }
  }
}