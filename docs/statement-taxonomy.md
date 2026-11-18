# Statement Taxonomy

## Language Layers

The grammar is organised into two conceptual layers.

### ISG CNC Base Language

Provides:

- program structure
- subroutines
- directives
- assignments
- control flow
- expressions
- CNC functions
- machine variables

### Select Extensions

Provides:

- laser and gas macros
- laser parameter blocks
- shape blocks
- ramp blocks
- burst blocks
- machine-specific process functionality

---

# Implemented Program Structure

## Main Program

```text
main_program
```

Example:

```select
%MAIN
```

---

## Subroutine Definition

```text
subroutine_definition
```

Example:

```select
%L EQUIPNO
```

---

## Subroutine Call

```text
subroutine_call
```

Example:

```select
LL EQUIPNO
```

---

# Implemented Statements

## Assignment Statements

```text
assignment_statement
└─ assignment
```

Examples:

```select
P1 = V.A.ACT_POS.X

V.E.FOCUS = 0.45
```

---

## Macro Statements

```text
macro_statement
└─ laser_macro
```

Examples:

```select
"LASERON"

"LASEROFF"

"GASON"500

"GASOFF"500
```

---

## M-Code Statements

```text
mcode_statement
└─ mcode
```

Examples:

```select
M29

M30
```

---

## Directive Statements

```text
directive_statement
├─ message_directive
├─ call_directive
└─ flush_directive
```

Examples:

```select
#MSG PLC ["Text"]

#CALL AX[A, 5, 0]

#FLUSH WAIT
```

---

# Implemented Control Flow

## FOR

```text
for_statement
```

Example:

```select
$FOR P1=1,3,1
```

---

## IF

```text
if_statement
└─ comparison_expression
```

Example:

```select
$IF V.E.CHANINDEX_AAXIS == 0
```

---

## ELSE

```text
else_statement
```

Example:

```select
$ELSE
```

---

## ENDIF

```text
endif_statement
```

Example:

```select
$ENDIF
```

---

## WHILE

```text
while_statement
```

Example:

```select
$WHILE P1 == 0
```

---

## ENDWHILE

```text
endwhile_statement
```

Example:

```select
$ENDWHILE
```

---

# Implemented Process Blocks

## Laser Parameter Block

```text
laser_parameter_block
├─ laserpara_begin
├─ assignment_statement
└─ laserpara_end
```

Examples:

```select
"LASERPARA_BEGIN"
V.E.PWR_VOLTAGE = 0.5
V.E.FOCUS = 0.45
"LASERPARA_END"
```

---

## Shape Block

```text
shape_block
├─ shape_begin
├─ assignment_statement
└─ shape_end
```

Examples:

```select
"SHAPE_BEGIN"
V.E.SHAPE_T[0] = 0
V.E.SHAPE_A[0] = 100
"SHAPE_END"
```

---

## Ramp Block

```text
ramp_block
├─ ramp_begin
├─ assignment_statement
└─ ramp_end
```

Examples:

```select
"RAMP_BEGIN"
V.E.STARTRAMP_PULSES = 10
V.E.STARTRAMP_ENERGY = 20
"RAMP_END"
```

---

## Burst Block

```text
burst_block
├─ burst_begin
├─ assignment_statement
└─ burst_end
```

Examples:

```select
"BURST_BEGIN"
V.E.BURSTON = 0
V.E.BURSTPULSES = 0
"BURST_END"
```

---

# Implemented Documentation Structures

## Comment Block

```text
comment_block
```

Example:

```select
#COMMENT BEGIN
...
#COMMENT END
```

Notes:

The internal content is intentionally not parsed.

---

## Line Comment

```text
line_comment
```

Example:

```select
; Rapid traverse
```

---

# Implemented Expression System

## Comparison Expression

```text
comparison_expression
├─ left_operand
├─ comparison_operator
└─ right_operand
```

Current implementation:

```text
comparison_expression
├─ variable
├─ comparison_operator
└─ number
```

Example:

```select
$IF V.E.CHANINDEX_AAXIS == 0
```

---

## Comparison Operators

Implemented:

```text
==
!=
>
<
>=
<=
```

Examples:

```select
P1 == P2

P1 != P2

P1 > P2

P1 < P2

P1 >= P2

P1 <= P2
```

---

# Implemented Atomic Nodes

## Variables

```text
parameter
variable
```

Examples:

```select
P1

P2

V.A.ACT_POS.X

V.E.PWR_VOLTAGE

V.E.SHAPE_T[0]
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

Notes:

These currently exist as atomic nodes only.

No structured motion model has been implemented yet.

---

## Literals

```text
number
string_literal
```

Examples:

```select
0

10

0.45

"LASERON"
```

---

# Planned Features

## Additional Directives

Planned investigation:

```text
fgroup_directive

additional ISG directives
```

---

## Boolean Expressions

Planned:

```text
boolean_expression
```

Candidate operators:

```text
AND
OR
XOR
NOT
```

---

## Arithmetic Expressions

Planned:

```text
arithmetic_expression
```

Candidate operators:

```text
+
-
*
/
MOD
**
```

---

## Structured Control Flow

Planned:

```text
if_block

while_block

do_block
```

---

## Additional Control Flow

Planned:

```text
do_statement
enddo_statement

goto_statement
```

---

## Structured CNC Motion

Planned:

```text
motion_statement

arc_motion_statement

positioning_statement
```

Examples:

```select
G01 X100 Y50 F4200

G17 G02 X0 Y0 I4 J0 F4200
```

---

# Current Status

Grammar branch:

```text
feature/ast-design-v0.2
```

Test status:

```text
34 / 34 PASS
```

Parser status:

```text
Stable
No known conflicts
Statement-oriented AST
Process block support implemented
Basic expression support implemented
```
