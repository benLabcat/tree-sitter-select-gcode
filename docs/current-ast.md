# Current AST

## Implemented Top-Level Nodes

### Documentation

- comment_block

### Process Blocks

- laser_parameter_block
- shape_block
- ramp_block
- burst_block

### Statements

- directive_statement
- assignment_statement
- macro_statement
- mcode_statement

### Flow Control

- for_statement

- if_statement
- else_statement
- endif_statement

- while_statement
- endwhile_statement

### Program Structure

- main_program

- subroutine_definition
- subroutine_call

## Atomic Nodes

### Variables

- parameter
- variable

### CNC

- gcode
- coordinate
- feedrate

### Literals

- number
- string_literal

### Directives

- message_directive

### Machine Functions

- mcode

### Macros

- laser_macro

## Statistics

Current regression tests:

25/25 PASS

Current grammar status:

- Stable
- No unresolved conflicts
- Statement-oriented AST
- Process block support implemented
