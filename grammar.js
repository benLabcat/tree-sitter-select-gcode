module.exports = grammar({
  name: "select_gcode",

  rules: {
    source_file: ($) => repeat($.statement),

    statement: ($) => "TODO"
  }
});
