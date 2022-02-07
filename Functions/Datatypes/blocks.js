// @id h42LtePpnV4LDQyytE0RFB
async function getDatatypeById(id) {
  const name = 'Datatype' + CAPITALIZE(id);
  return (new (System.registry.findComponent(name))).getMeta();
}

// @id hwRQEsH1ak1RP5keaLCgHi
describe('getDatatypeByName()', () => {
  it('should return the right datatype', async () => {
    expect((await getDatatypeById('integer')).id).to.equal('integer');
  });
});