// @id bMA897rXjy3ePLrXxPIxW2
class SparkcellColor extends System.Sparkcell {
  constructor() {
    super();

    this.template = `
      <div>
        <v-icon small 
          v-if   = "value"
          :color = "value">
          mdi-square-rounded
        </v-icon>
        {{ value }}
      </div>`;
  }
}