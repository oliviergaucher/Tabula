// @id rsr84c18IZL2avEY2hHNUJ
class ColumnCreator extends System.Control {
  constructor() {
    super();

    this.datatype = "object";

    this.template = `
      <div>
        <v-text-field
          class         = "tabula"
          v-model       = "record[field.options.id].name"
          label         = "Column name"
          hint          = "Name of the new column"
          prepend-icon  = "mdi-card-account-details-outline"
          @change       = "onNameChange"
        ></v-text-field>
        <v-select
          class         = "tabula"
          v-model       = "record[field.options.id].datatype"
          :items        = "field.options.options.context.datatypes"
          item-text     = "name"
          item-value    = "id"
          label         = "Column datatype"
          hint          = "Datatype of the new column"
          prepend-icon  = "mdi-currency-usd"
          @change       = "onDatatypeChange"
        ></v-select>
      </div>
    `;

    this.methods = {
      onNameChange(value) {
        this.record[this.field.options.id].name = value;
        this.$emit('change');
      },
      onDatatypeChange(value) {
        this.record[this.field.options.id].datatype = value;
        this.$emit('change');
      }
    }
  }
}