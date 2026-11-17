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
          $.message_directive,
          $.assignment,
          $.gcode,
          $.mcode,
          $.coordinate,
          $.feedrate,
          $.parameter,
          $.variable,
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

    message_directive: ($) =>
      token(
        /#MSG.*/
      ),



    line_comment: ($) =>
      token(
        seq(
          ";",
          /.*/
        )
      )
  }
});
