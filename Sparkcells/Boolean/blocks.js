// @id vYDRYyP1JHdDbw3q0Lmx8X
class SparkcellBoolean extends System.Sparkcell {
  constructor() {
    super();

    this.template = `
      <div>
        <v-icon small 
          v-if   = "!value"
          color = "#cccccc">
          mdi-toggle-switch-off-outline
        </v-icon>
        <v-icon small 
          v-if   = "value"
          color = "#66b3ac">
          mdi-toggle-switch-outline
        </v-icon>
      </div>`;
  }
}