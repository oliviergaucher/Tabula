// @id f1PsTB2Q1N2eoxbkR8EVsL
DATATYPES = {}

FETCHROWS(`Datatypes!Datatypes`, 0, 100)
  .forEach(datatype => { DATATYPES[datatype.id] = datatype; });

DATATYPES;