# Highlighting Strategy

## Category: Program Structure

Examples:

%MAIN
%L
LL

Tree-Sitter Capture:

@module
@function
@function.call

---

## Category: G-Codes

Examples:

G00
G01
G02
G17
G90
G91
G92
G260
G261

Tree-Sitter Capture:

@keyword

---

## Category: M-Codes

Examples:

M29
M30

Tree-Sitter Capture:

@constant.builtin

---

## Category: Parameters

Examples:

P1
P2
P100

Tree-Sitter Capture:

@variable.parameter

---

## Category: Machine Variables

Examples:

V.A.ACT_POS.X
V.A.ACT_POS.Y

Tree-Sitter Capture:

@variable.builtin

---

## Category: Process Variables

Examples:

V.E.PWR_VOLTAGE
V.E.FOCUS
V.E.PULSEWIDTH

Tree-Sitter Capture:

@variable

---

## Category: Array Variables

Examples:

V.E.SHAPE_T[0]
V.E.SHAPE_A[0]

Tree-Sitter Capture:

@variable

---

## Category: Coordinates

Examples:

X100
Y50
Z10
I4
J0
K2

Tree-Sitter Capture:

@property

---

## Category: Feed Rates

Examples:

F4200
F8000
F9500

Tree-Sitter Capture:

@number

---

## Category: Laser Macros

Examples:

"LASERON"
"LASEROFF"
"GASON"

Tree-Sitter Capture:

@string.special

---

## Category: Process Blocks

Examples:

"LASERPARA_BEGIN"
"LASERPARA_END"

"SHAPE_BEGIN"
"SHAPE_END"

"RAMP_BEGIN"
"RAMP_END"

"BURST_BEGIN"
"BURST_END"

Tree-Sitter Capture:

@type

---

## Category: Flow Control

Examples:

$FOR
$ENDFOR

Tree-Sitter Capture:

@keyword.control

---

## Category: Directives

Examples:

#MSG

#COMMENT BEGIN

#COMMENT END

Tree-Sitter Capture:

@attribute

---

## Category: Comments

Examples:

; comment

Tree-Sitter Capture:

@comment
