# Select GCode AST v0.3 Roadmap

## Guiding Principle

Changes should only be accepted when they improve the readability
of real-world Select programs inside modern editors (Zed, VS Code, etc.).

AST complexity alone is not a sufficient reason to introduce new nodes.

## Objective

Improve the Tree-sitter AST to expose semantically important Select constructs that are currently tokenized as flat text.

The primary goal of v0.3 is **improved readability and navigation inside editors such as Zed**, rather than broader language coverage.

---

# Priority 1 - High Visual Impact

These changes provide the largest readability improvements for real production programs.

---

## P1.1 Structured FOR Statements

### Current

```select
$FOR P1=10,P8,P7
```

Current AST:

```text
for_statement
```

### Target AST

```text
for_statement
├── for_keyword
├── parameter
├── number
├── parameter
└── parameter
```

### Benefits

Visual separation of:

- Loop variable
- Start value
- End value
- Increment

Example:

```select
$FOR P1=10,P8,P7
```

should visually expose:

```text
FOR
P1
10
P8
P7
```

### Priority

⭐⭐⭐⭐⭐

---

## P1.2 Structured Coordinate Words

### Current

```select
X100
Y50
Z-2
A90
```

Current AST:

```text
coordinate
```

### Target AST

```text
coordinate
├── axis
└── number
```

Example:

```text
coordinate
├── axis(X)
└── number(100)
```

### Benefits

The axis letter is usually more important than the numeric value during code review.

Example:

```select
G01 X100 Y50 Z-2
```

becomes visually scannable.

### Priority

⭐⭐⭐⭐⭐

---

## P1.3 Structured Feedrates

### Current

```select
F4200
```

Current AST:

```text
feedrate
```

### Target AST

```text
feedrate
├── feedrate_keyword
└── number
```

### Benefits

Consistent handling with coordinates.

### Priority

⭐⭐⭐⭐⭐

---

## P1.4 Structured Subroutine Keywords

### Current

```select
%L START

LL START
```

Current AST:

```text
subroutine_definition
└── identifier

subroutine_call
└── identifier
```

### Target AST

```text
subroutine_definition
├── definition_keyword
└── identifier

subroutine_call
├── call_keyword
└── identifier
```

Example:

```text
definition_keyword -> %L
call_keyword       -> LL
```

### Benefits

Makes program architecture visible.

### Priority

⭐⭐⭐⭐⭐

---

# Priority 2 - Language Correctness

These items improve AST quality and fix real parsing limitations.

---

## P2.1 Inline Comments After Directives

### Current

```select
#MSG TEST ;COMMENT
```

Current AST:

```text
message_directive
```

Comment is lost.

### Desired AST

```text
message_directive
line_comment
```

### Affected Constructs

```select
#MSG
#CALL
#FLUSH
```

### Benefits

Consistent comment highlighting.

### Priority

⭐⭐⭐⭐

---

## P2.2 Structured IF Statements

### Current

```select
$IF V.E.VALUE == 0
```

### Target AST

```text
if_statement
├── if_keyword
└── comparison_expression
```

### Benefits

Allows separate styling of keyword and expression.

### Priority

⭐⭐⭐⭐

---

## P2.3 Structured WHILE Statements

### Current

```select
$WHILE P1 < 10
```

### Target AST

```text
while_statement
├── while_keyword
└── comparison_expression
```

### Priority

⭐⭐⭐⭐

---

## P2.4 Structured GOTO Statements

### Current

```select
$GOTO [END]
```

### Target AST

```text
goto_statement
├── goto_keyword
└── label_reference
```

### Priority

⭐⭐⭐⭐

---

# Priority 3 - Semantic Improvements

Improve AST expressiveness.

---

## P3.1 Variable Family Detection

### Current

All variables:

```text
variable
```

### Potential Future Types

```text
external_variable
axis_variable
system_variable
```

Examples:

```select
V.E.FOCUS
V.A.ACT_POS.X
V.S.STATUS
```

### Benefits

Better visual grouping.

### Priority

⭐⭐⭐

---

## P3.2 Structured Directive Arguments

### Current

```select
#CALL AX[A,5,0]
```

Current AST:

```text
call_directive
```

### Target AST

```text
call_directive
├── call_keyword
└── directive_arguments
```

### Benefits

Allows highlighting the operation separately from the payload.

### Priority

⭐⭐⭐

---

# Priority 4 - Nice-to-Have Refinements

Not required for v0.3.

---

## P4.1 Block Markers

Examples:

```select
"LASERPARA_BEGIN"
"LASERPARA_END"

"SHAPE_BEGIN"
"SHAPE_END"

"RAMP_BEGIN"
"RAMP_END"

"BURST_BEGIN"
"BURST_END"
```

Optional AST:

```text
block_begin_marker
block_end_marker
```

### Priority

⭐⭐

---

# Implementation Order

## Phase 1

- [ ] Structured FOR Statements
- [X] Structured Coordinates
- [X] Structured Feedrates
- [ ] Structured Subroutine Keywords

---

## Phase 2

- [ ] Inline Comments After Directives
- [ ] Structured IF Statements
- [ ] Structured WHILE Statements
- [ ] Structured GOTO Statements

---

## Phase 3

- [ ] Variable Family Detection
- [ ] Structured Directive Arguments

---

## Phase 4

- [ ] Block Marker Nodes

---

# Success Criteria

A real-world Select program should allow immediate visual identification of:

- Program structure (`%MAIN`, `%L`, `LL`)
- Flow control (`$FOR`, `$IF`, `$WHILE`, `$GOTO`)
- Labels (`[START]`, `[END]`)
- Motion (`G`, `M`, axes, feedrates)
- Variables and values
- Directives (`#CALL`, `#MSG`, `#FLUSH`)
- Process blocks (`LASERPARA`, `SHAPE`, `RAMP`, `BURST`)

without requiring users to inspect the entire line.
