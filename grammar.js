module.exports = grammar({
  name: "select_gcode",

  extras: ($) => [
    /[ \t\r\n]+/,
  ],

  rules: {
    source_file: ($) =>
      repeat(
        choice(
          $.main_program,
          $.subroutine_definition,
          $.subroutine_call,
          $.for_statement,
          $.directive_statement,
          $.assignment_statement,
          $.laser_parameter_block,
          $.gcode,
          $.mcode_statement,
          $.coordinate,
          $.feedrate,
          $.parameter,
          $.variable,
          $.shape_block,
          $.ramp_block,
          $.burst_block,
          $.macro_statement,
          $.line_comment
        )
      ),

    main_program: ($) =>
      "%MAIN",

    subroutine_definition: ($) =>
      seq(
        "%L",
        field("name", $.identifier)
      ),

    subroutine_call: ($) =>
      seq(
        "LL",
        field("name", $.identifier)
      ),

    for_statement: ($) =>
      token(
        /\$(FOR|ENDFOR).*/
      ),

    gcode: ($) =>
      token(/G\d+/),

    mcode: ($) =>
      token(/M\d+/),

    assignment: ($) =>
      seq(
        choice(
          $.parameter,
          $.variable
        ),
        "=",
        choice(
          $.parameter,
          $.variable,
          $.number
        )
      ),

    parameter: ($) =>
      token(/P\d+/),

    variable: ($) =>
      token(
        /V(\.[A-Z0-9_]+)+(\[\d+\])?/
      ),

    coordinate: ($) =>
      token(
        /[XYZIJKABC][-+]?\d*\.?\d+/
      ),

    feedrate: ($) =>
      token(
        /F\d+(\.\d+)?/
      ),

    macro_statement: ($) =>
      $.laser_macro,

    assignment_statement: ($) =>
      $.assignment,

    mcode_statement: ($) =>
      $.mcode,

    laser_macro: ($) =>
      seq(
        $.string_literal,
        optional($.number)
      ),

    string_literal: ($) =>
      token(
        seq(
          '"',
          /[^"]+/,
          '"'
        )
      ),

    identifier: ($) =>
      /[A-Za-z_][A-Za-z0-9_]*/,

    number: ($) =>
      token(
        /-?\d+(\.\d+)?/
      ),

    directive_statement: ($) =>
      $.message_directive,

    message_directive: ($) =>
      token(
        /#MSG.*/
      ),

    laser_parameter_block: ($) =>
      seq(
        $.laserpara_begin,
        repeat1($.assignment_statement),
        $.laserpara_end
      ),

    laserpara_begin: ($) =>
      '"LASERPARA_BEGIN"',

    laserpara_end: ($) =>
      '"LASERPARA_END"',

    shape_block: ($) =>
      seq(
        $.shape_begin,
        repeat1($.assignment_statement),
        $.shape_end
      ),

    shape_begin: ($) =>
      '"SHAPE_BEGIN"',

    shape_end: ($) =>
      '"SHAPE_END"',

    ramp_block: ($) =>
      seq(
        $.ramp_begin,
        repeat1($.assignment_statement),
        $.ramp_end
      ),

    ramp_begin: ($) =>
      '"RAMP_BEGIN"',

    ramp_end: ($) =>
      '"RAMP_END"',

    burst_block: ($) =>
      seq(
        $.burst_begin,
        repeat1($.assignment_statement),
        $.burst_end
      ),

    burst_begin: ($) =>
      '"BURST_BEGIN"',

    burst_end: ($) =>
      '"BURST_END"',


    line_comment: ($) =>
      token(
        seq(
          ";",
          /.*/
        )
      )
  }
});
