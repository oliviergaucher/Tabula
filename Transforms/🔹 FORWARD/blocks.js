// @id egIszGITXYP49ZRqMb2rqx
// @title Overview
getTransformOverview('FORWARD')

// @id LJBzA2XQUz7y6ghWBm8UVU
// @title FORWARD Class
__FORWARD = class extends Transform {
  getParams() {
    return forwardParams;
  }

  async getData() {
    return forwardData();
  }

  async getMeta() {
    return forwardMeta(this.spec, this.meta);
  }
}

// @id qQeMtcrG0prU0u81BbSfyh
// @title FORWARD Params
forwardParams = [];

// @id eNgrstZFZ41vLUbmmBg3UH
// @title FORWARD Data
forwardData = function (spec, meta) {
  try {
    return [];
  } catch (error) {
    console.log('Error in forwardData() function: ' + error);
  }
}

// @id O3VpVXe0DNivGauLZpuNa3
// @title FORWARD Meta
forwardMeta = function (spec, meta) {
  try {
    return meta;
  } catch (error) {
    console.log('Error in forwardMeta() function: ' + error);
  }
}

// @id xIiAYSLjtdQJJDlZzEyRxh
// @title FORWARD Test
cook([
  {
    transform: 'ADD',
    spec: {
      id: 'ZmU8',
      name: 'Countries for FORWARD',
      description: 'Table used to test the FORWARD transform.',
      dataset: {
        type: 'url',
        list: ['https://stoic.com/datasets/Countries.csv'],
      }
    }
  },
  {
    transform: 'FORWARD',
    spec: {},
  }
]);