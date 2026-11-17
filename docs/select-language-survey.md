# Select Language Survey

Documenting the observed syntax and language constructs found in real-world Bystronic / Coherent Select GCode programs.

---

# Program Structure

## Main Program

Entry point of the program.

```select
%MAIN
```

---

## Local Subroutine Definition

Defines a local callable subroutine.

```select
%L EQUIPNO

%L CHAR_0

%L KREISE
```

---

## Local Subroutine Call

Calls a locally defined subroutine.

```select
LL EQUIPNO

LL CHAR_0

LL KREISE
```

---

## Program End

Ends the main program.

```select
M30
```

---

## Subroutine End

Ends a local subroutine.

```select
M29
```

---

# Comments

## Line Comment

Everything after a semicolon until end-of-line.

```select
;Rapid traverse

;Linear interpolation

;Call local subroutine
```

---

## Block Comment

Multi-line comment section.

```select
#COMMENT BEGIN

Text...

#COMMENT END
```

Observed example:

```select
#COMMENT BEGIN
File: CNC Test Fiber KW_NO_RCU.nc
Project: P:\Entwicklung_Projekte\Serie\CNC_Testprogramme
Created Date: 2024-08-14 13:46:36
Author: Ruben Montoliu
#COMMENT END
```

---

# Directives

## Message Directive

Displays information to the operator.

```select
#MSG SYN PLC ["Set start position to the upper left corner"]
```

---

# Parameters

General-purpose program variables.

## Parameter References

```select
P1

P2

P100
```

Pattern:

```regex
P\d+
```

---

## Parameter Assignments

```select
P1 = V.A.ACT_POS.X

P2 = V.A.ACT_POS.Y

P3 = 0 - V.A.ACT_POS.X
```

---

# Variables

## Machine State Variables

Observed examples:

```select
V.A.ACT_POS.X

V.A.ACT_POS.Y
```

Pattern:

```text
V.A.*
```

---

## Process Variables

Observed examples:

```select
V.E.PWR_VOLTAGE

V.E.PULSEWIDTH

V.E.FOCUS

V.E.PULSEFREQUENCY

V.E.DOTDISTANCE

V.E.SYNCMODE

V.E.IPMMODE

V.E.MICROWELD

V.E.CWMODE
```

Pattern:

```text
V.E.*
```

---

## Array Variables

Observed examples:

```select
V.E.SHAPE_T[0]

V.E.SHAPE_A[0]

V.E.SHAPE_T[5]

V.E.SHAPE_A[5]
```

Pattern:

```text
VariableName[Index]
```

---

# Assignments

## Simple Assignment

```select
P1 = V.A.ACT_POS.X

V.E.FOCUS = 0.45

V.E.CWMODE = 0
```

---

## Expression Assignment

```select
P3 = 0 - V.A.ACT_POS.X

P4 = 0 - V.A.ACT_POS.Y
```

---

# Motion Commands

## Rapid Movement

```select
G00 X0 Y0

G00 X160 Y7 Z200 F8000
```

---

## Linear Interpolation

```select
G01 X100 Y50

G01 X-100 Y100 F4200
```

---

## Circular Interpolation

```select
G02 X0 Y0 I4 J0 F4200
```

---

## Plane Selection

```select
G17
```

---

## Absolute Positioning

```select
G90
```

---

## Incremental Positioning

```select
G91
```

---

## Coordinate Offset

```select
G92 XP1

G92 YP2

G92 X0

G92 Y0
```

---

## Polynomial Contouring

Enable:

```select
G261
```

Disable:

```select
G260
```

---

# M Commands

Observed examples:

```select
M29

M30
```

---

# Coordinate Addresses

## Linear Axes

```select
X100

Y50

Z10
```

---

## Arc Centres

```select
I4

J0

K2
```

---

## Rotary Axes

Observed from inherited syntax definition.

```select
A

B

C
```

No reference usage found yet in the sample file.

---

## Feed Rate

```select
F4200

F8000

F9500
```

---

# Motion Block Structure

Observed examples.

## Linear Motion

```select
G01 X100 Y50 F4200
```

Contains:

- G-Code
- Coordinates
- Feed rate

---

## Arc Motion

```select
G17 G02 X0 Y0 I4 J0 F4200
```

Contains:

- Plane selection
- Arc interpolation
- End coordinates
- Arc centre coordinates
- Feed rate

---

# Laser Macros

## Laser Control

Enable laser:

```select
"LASERON"
```

Disable laser:

```select
"LASEROFF"
```

---

## Gas Control

Enable gas:

```select
"GASON"500
```

Disable gas:

```select
"GASOFF"500
```

Observed syntax:

```select
"MacroName"500
```

Macro followed by numeric parameter.

---

## Manual Mode

```select
"MANUAL"
```

---

## Ramp Control

```select
"RAMPON"

"RAMPOFF"
```

---

# Process Blocks

## Laser Parameter Block

```select
"LASERPARA_BEGIN"

...

"LASERPARA_END"
```

Observed variables:

```select
V.E.PWR_VOLTAGE

V.E.PULSEWIDTH

V.E.FOCUS

V.E.PULSEFREQUENCY

V.E.DOTDISTANCE

V.E.SYNCMODE

V.E.IPMMODE

V.E.MICROWELD

V.E.CWMODE
```

---

## Shape Definition Block

```select
"SHAPE_BEGIN"

...

"SHAPE_END"
```

Observed variables:

```select
V.E.SHAPE_T[0]

V.E.SHAPE_A[0]
```

---

## Ramp Definition Block

```select
"RAMP_BEGIN"

...

"RAMP_END"
```

Observed variables:

```select
