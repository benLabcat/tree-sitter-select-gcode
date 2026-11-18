# AST Design v0.2

## Goal

Move from token recognition to Select/ISG language structure recognition.

Current v0.1 style:

```text
(source_file
  (gcode)
  (coordinate)
  (coordinate)
  (feedrate))
```

Target architecture:

```text
(source_file
  (statement)
  (statement)
  (statement))
```

The grammar should describe real ISG CNC and Select language constructs rather than isolated tokens.

---

# Language Layers

The grammar consists of two conceptual layers.

## ISG CNC Base Language

Provides:

- program structure
- subroutines
- directives
- assignments
- expressions
- control flow
- CNC functions
- machine variables

Examples:

```select
$IF V.E.VALUE == 0

$WHILE P1 == 0

#MSG PLC ["Text"]

P1 = P2 + 10

M30
```

---

## Select Extensions

Provides:

- laser control macros
- gas control macros
- laser parameter blocks
- shape blocks
- ramp blocks
- burst blocks

Examples:

```select
"LASERON"

"GASON"500

"LASERPARA_BEGIN"

"SHAPE_BEGIN"

"RAMP_BEGIN"

"BURST_BEGIN"
```

---

# Root Structure

```text
source_file
 ├─ statement
 ├─ statement
 ├─ statement
 └─ statement
```

A Select program is represented as a sequence of statements and blocks.

---

# Implemented Statement Types

## Main Program

Example:

```select
%MAIN
```

AST:

```text
(main_program)
```

Status:

```text
Implemented
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

Status:

```text
Implemented
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

Status:

```text
Implemented
```

---

## Directive Statement

Example:

```select
#MSG TEST
```

AST:

```text
(directive_statement
  (message_directive))
```

Status:

```text
Implemented
```

---

## Assignment Statement

Example:

```select
P1 = V.A.ACT_POS.X
```

AST:

```text
(assignment_statement
  (assignment
    (parameter)
    (variable)))
```

---

Example:

```select
V.E.FOCUS = 0.45
```

AST:

```text
(assignment_statement
  (assignment
    (variable)
    (number)))
```

Status:

```text
Implemented
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

Status:

```text
Implemented
```

---

## M-Code Statement

Example:

```select
M30
```

AST:

```text
(mcode_statement
  (mcode))
```

Status:

```text
Implemented
```

---

# Implemented Control Flow

## FOR Statement

Example:

```select
$FOR P1=1,3,1
```

AST:

```text
(for_statement)
```

Status:

```text
Implemented
```

---

## IF Statement

Example:

```select
$IF V.E.CHANINDEX_AAXIS == 0
```

AST:

```text
(if_statement)
```

Status:

```text
Implemented
```

---

## ELSE Statement

Example:

```select
$ELSE
```

AST:

```text
(else_statement)
```

Status:

```text
Implemented
```

---

## ENDIF Statement

Example:

```select
$ENDIF
```

AST:

```text
(endif_statement)
```

Status:

```text
Implemented
```

---

## WHILE Statement

Example:

```select
$WHILE P1 == 0
```

AST:

```text
(while_statement)
```

Status:

```text
Implemented
```

---

## ENDWHILE Statement

Example:

```select
$ENDWHILE
```

AST:

```text
(endwhile_statement)
```

Status:

```text
Implemented
```

---

# Implemented Process Blocks

## Laser Parameter Block

Example:

```select
"LASERPARA_BEGIN"
V.E.PWR_VOLTAGE = 0.5
V.E.FOCUS = 0.45
"LASERPARA_END"
```

AST:

```text
(laser_parameter_block
  (laserpara_begin)
  (assignment_statement)
  (assignment_statement)
  (laserpara_end))
```

Status:

```text
Implemented
```

---

## Shape Block

Example:

```select
"SHAPE_BEGIN"
V.E.SHAPE_T[0] = 0
V.E.SHAPE_A[0] = 100
"SHAPE_END"
```

AST:

```text
(shape_block
  (shape_begin)
  (assignment_statement)
  (assignment_statement)
  (shape_end))
```

Status:

```text
Implemented
```

---

## Ramp Block

Example:

```select
"RAMP_BEGIN"
V.E.STARTRAMP_PULSES = 10
V.E.STARTRAMP_ENERGY = 20
"RAMP_END"
```

AST:

```text
(ramp_block
  (ramp_begin)
  (assignment_statement)
  (assignment_statement)
  (ramp_end))
```

Status:

```text
Implemented
```

---

## Burst Block

Example:

```select
"BURST_BEGIN"
V.E.BURSTON = 0
V.E.BURSTPULSES = 0
"BURST_END"
```

AST:

```text
(burst_block
  (burst_begin)
  (assignment_statement)
  (assignment_statement)
  (burst_end))
```

Status:

```text
Implemented
```

---

# Implemented Documentation Blocks

## Comment Block

Example:

```select
#COMMENT BEGIN
Example text
#COMMENT END
```

AST:

```text
(comment_block)
```

Notes:

The content of the comment block is intentionally not parsed.

Status:

```text
Implemented
```

---

# Atomic Nodes

## Variables

```text
parameter
variable
```

Examples:

```select
P1

V.A.ACT_POS.X

V.E.PWR_VOLTAGE

V.E.SHAPE_T[0]
```

Status:

```text
Implemented
```

---

## Literals

```text
number
string_literal
```

Examples:

```select
0.45

100

"LASERON"
```

Status:

```text
Implemented
```

---

## CNC Motion Atoms

```text
gcode
coordinate
feedrate
```

Examples:

```select
G01

X100

Y50

I4

J0

F4200
```

Status:

```text
Implemented
```

Notes:

These currently exist as atomic nodes only.

Future versions should promote them into structured motion statements.

---

# Planned Expression System

The current grammar does not parse expressions.

Future implementation should support:

## Arithmetic Expressions

Examples:

```select
P1 = P2 + 10

P1 = P2 - P3

P1 = P2 * [P3 + 1]

P1 = P2 / P3

P1 = 2 ** P3

P1 = 11 MOD 3
```

Candidate node:

```text
(arithmetic_expression)
```

---

## Comparison Expressions

Examples:

```select
P1 == P2

P1 != P2

P1 >= P2

P1 <= P2
```

Candidate node:

```text
(comparison_expression)
```

---

## Boolean Expressions

Examples:

```select
P1 AND P2

P1 OR P2

NOT[P1]
```

Candidate node:

```text
(boolean_expression)
```

---

# Planned Structured Control Flow

Current implementation recognises the statements.

Future implementation should recognise full blocks.

## IF Block

Candidate AST:

```text
(if_block
  (condition)
  (body)
  (else_block))
```

---

## WHILE Block

Candidate AST:

```text
(while_block
  (condition)
  (body))
```

---

## DO Block

Candidate AST:

```text
(do_block
  (condition)
  (body))
```

---

# Planned CNC Motion Model

Current implementation:

```text
(gcode)
(coordinate)
(feedrate)
```

Future implementation:

```text
(motion_statement
  (gcode)
  (coordinate)
  (coordinate)
  (feedrate))
```

---

Example:

```select
G01 X100 Y50 F4200
```

---

Arc motion:

```select
G17 G02 X0 Y0 I4 J0 F4200
```

Candidate AST:

```text
(arc_motion_statement
  ...)
```

---

# AST Maturity

## Phase 1 - Tokens

Completed

```text
gcode
variable
parameter
number
string_literal
```

---

## Phase 2 - Statements

Completed

```text
directive_statement

assignment_statement

macro_statement

mcode_statement

for_statement

if_statement
else_statement
endif_statement

while_statement
endwhile_statement
```

---

## Phase 3 - Process Blocks

Completed

```text
laser_parameter_block

shape_block

ramp_block

burst_block

comment_block
```

---

## Phase 4 - Expressions

Planned

```text
comparison_expression

arithmetic_expression

boolean_expression
```

---

## Phase 5 - Structured Control Flow

Planned

```text
if_block

while_block

do_block
```

---

## Phase 6 - CNC Motion

Planned

```text
motion_statement

arc_motion_statement

positioning_statement
```

---

# Current Project Status

```text
Grammar branch:
feature/ast-design-v0.2

Regression tests:
25 / 25 PASS

Architecture:
Stable

Known parser conflicts:
None
```
