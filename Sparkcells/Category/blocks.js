// @id wroFpX4Qbjt65r76hrPYNC
class SparkcellCategory extends System.Sparkcell {
  constructor() {
    super();

    this.css = `
      .sparkcell-category {
        text-align  : left;
        white-space : nowrap;
      }
    `;

    this.template = `
      <div class = "sparkcell-category">
        <v-icon small 
          v-if   = "column && column.options && column.options.items"
          :color = "colors[value]">
          mdi-square-rounded
        </v-icon>
        {{ value }}
      </div>`;

    this.computed = {
      colors() {
        if (!this.column.options || !this.column.options.items) {
          return {};
        }

        const colors = {};

        for (const item of this.column.options.items) {
          colors[item.name] = item.color;
        }

        return colors;
      }
    };
  }
}