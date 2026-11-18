# AST Design v0.2

## Goal

Move from token recognition to Select language structure recognition.

Current v0.1:

```text
(source_file
  (gcode)
  (coordinate)
  (coordinate)
  (feedrate))
```

Target:

```text
(source_file
  (motion_statement
    (gcode)
    (coordinate)
    (coordinate)
    (feedrate)))
```

The parser should represent the semantic structure of Select programs rather than individual tokens.

---

# Root Structure

```text
source_file
 ├─ statement
 ├─ statement
 ├─ statement
 └─ statement
```

A Select program is fundamentally a sequence of statements.

---

# Statement Types

## Main Program

Example:

```select
%MAIN
```

AST:

```text
(main_program)
```

---

## Subroutine Definition

Example:

```select
%L EQUIPNO
```

AST:

```text
(subroutine_definition
  name: (identifier))
```

---

## Subroutine Call

Example:

```select
LL EQUIPNO
```

AST:

```text
(subroutine_call
  name: (identifier))
```

---

## Motion Statement

Example:

```select
G01 X100 Y50 F4200
```

AST:

```text
(motion_statement
  (gcode)
  (coordinate)
  (coordinate)
  (feedrate))
```

---

## Arc Motion Statement

Example:

```select
G17 G02 X0 Y0 I4 J0 F4200
```

AST:

```text
(motion_statement
  (gcode)
  (gcode)
  (coordinate)
  (coordinate)
  (coordinate)
  (coordinate)
  (feedrate))
```

---

## Macro Statement

Example:

```select
"LASERON"
```

AST:

```text
(macro_statement
  (laser_macro))
```

---

Example:

```select
"GASON"500
```

AST:

```text
(macro_statement
  (laser_macro
    (string_literal)
    (number)))
```

---

## Assignment

Example:

```select
P1 = V.A.ACT_POS.X
```

AST:

```text
(assignment
  (parameter)
  (variable))
```

---

Example:

```select
V.E.FOCUS = 0.45
```

AST:

```text
(assignment
  (variable)
  (number))
```

---

## Directive

Example:

```select
#MSG SYN PLC ["Set start position"]
```

AST:

```text
(message_directive)
```

---

## Comment

Example:

```select
;Rapid traverse
```

AST:

```text
(line_comment)
```

---

## Program End

Example:

```select
M30
```

AST:

```text
(mcode))
```

---

# Future Statement Types

Not yet implemented.

## FOR Statement

Example:

```select
$FOR P1=1,3,1
```

Candidate AST:

```text
(for_statement
  variable: (parameter)
  start: (number)
  end: (number)
  step: (number))
```

---

## END FOR

Example:

```select
$ENDFOR
```

AST:

```text
(endfor_statement)
```

---

## IF Statement

Expected syntax:

```select
$IF
```

Candidate node:

```text
(if_statement)
```

---

## ELSE Statement

Expected syntax:

```select
$ELSE
```

Candidate node:

```text
(else_statement)
```

---

## ENDIF Statement

Expected syntax:

```select
$ENDIF
```

Candidate node:

```text
(endif_statement)
```

---

# Process Blocks

Future design.

## LASERPARA Block

```select
"LASERPARA_BEGIN"
...
"LASERPARA_END"
```

Candidate AST:

```text
(laser_parameter_block
  ...)
```

---

## SHAPE Block

```select
"SHAPE_BEGIN"
...
"SHAPE_END"
```

Candidate AST:

```text
(shape_block
  ...)
```

---

## RAMP Block

```select
"RAMP_BEGIN"
...
"RAMP_END"
```

Candidate AST:

```text
(ramp_block
  ...)
```

---

## BURST Block

```select
"BURST_BEGIN"
...
"BURST_END"
```

Candidate AST:

```text
(burst_block
  ...)
```

---

# Design Rules

## Rule 1

Nodes should represent Select concepts.

Good:

```text
motion_statement
macro_statement
assignment
```

Bad:

```text
token_group
line_1
```

---

## Rule 2

A statement should correspond to one logical Select instruction.

Examples:

```select
G01 X100 Y50 F4200
```

```select
"LASERON"
```

```select
P1 = 5
```

---

## Rule 3

Highlighting must be derived from AST nodes wherever possible.

Preferred:

```text
motion_statement
 └─ gcode
```

over regex-only highlighting.

---

## Rule 4

Real Select programs are the specification.

Grammar changes must be validated against:

```text
examples/reference_program.select
```

before being accepted.


Implemented Statement Types

✅ macro_statement

✅ assignment_statement

✅ mcode_statement


Next Candidates

motion_statement

directive_statement

subroutine_call_statement

subroutine_definition_statement


process_block

laser_parameter_block

shape_block

ramp_block

burst_block

process_block
├─ begin_marker
├─ body
└─ end_marker
