// @id kZjXr5Oif5CN370LX5ZWL7
async function FormRenderer(entryId, form, context) {
  try {
    const entry = await EVALUATE("`Transforms`." + entryId);
    const spec = {
      id: 'form',
      options: { autoSubmit: true },
      component: 'sd-form',
      children: form.map(element => {
        element.options = (element.options === undefined) ? {} : element.options;
        element.options.context = context;
        return {
          id: 'element_' + element.id,
          component: 'sd-field',
          options: {
            id: element.id,
            label: element.label,
            hint: element.hint,
            icon: element.icon,
            control: element.control,
            options: element.options,
            modes: element.modes,
          }
        }
      })
    };

    return VUE({
      props: { [entryId]: entry, spec },
      template: `
        <sd-form
          :entry        = "${entryId}"
          prefix-id     = "form"
          :spec         = "spec"
          @submitRecord = "${entryId} = { ...${entryId}, ...$event.record }">
        </sd-form>`
    });
  } catch (error) {
    console.log('Error in FormRenderer() function: ' + error);
    return HTML`<code>Sorry, form cannot be rendered.</code>`;
  }
}