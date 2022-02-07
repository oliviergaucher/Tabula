// @id uUuRonv2zWvgtF0lOAKudM
class SparkcellIcon extends System.Sparkcell {
  constructor() {
    super();

    this.template = `
      <div>
        <v-icon small 
          v-if  = "value"
          color = "#6f6f6f">
          {{ value }}
        </v-icon>
        {{ value }}
      </div>`;
  }
}