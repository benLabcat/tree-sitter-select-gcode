# Statement Taxonomy

## ISG Base Language

### Program Structure

- main_program
- subroutine_definition
- subroutine_call

### Assignments

- assignment_statement

### Directives

- directive_statement

### Machine Functions

- mcode_statement

### Flow Control

Implemented:

- for_statement

- if_statement
- else_statement
- endif_statement

- while_statement
- endwhile_statement

Planned:

- do_statement
- enddo_statement

- goto_statement

### Future Expression System

Planned:

- comparison_expression
- arithmetic_expression
- boolean_expression

## Select Extensions

### Macros

- macro_statement

### Process Blocks

- laser_parameter_block
- shape_block
- ramp_block
- burst_block

## Atomic Nodes

### Variables

- parameter
- variable

### Motion

- gcode
- coordinate
- feedrate

### Literals

- number
- string_literal

## Current Status

Implemented:

- 25 tests passing
- control-flow primitives
- process blocks
- statement-oriented AST

Next major milestone:

- expression support
