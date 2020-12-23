
In computers, there are multiple ways of representing numbers:

- Hexadecimal aka `base 16`
- Decimal aka `base 10`
- Binary aka `base 2`

Computers typically understand all three of these, with special prefixes used for Hexadecimal and Binary.
```
42473 (10)
0xA5E9 (16)
0b1010010111101001 (2)
```

---

## Converting from decimal to binary 
```
42473 
----------
21236	1 <-- ones (least significant)
10618	0
5309	0
2654	1
1327	0
663		1
331		1
165		1
82		1
41		0
20		1
10		0
5		0
2		1
1		0
0		1 <-- Most significant

write the number, starting from the bottom and going up: 
1010010111101001 
```

```
1977
--------------
988	1
494	0
247	0
123	1
61	1
30	1
15	0
7	1
3	1
1	1
0	1

11110111001
```


---------------

## Converting from binary to decimal
```
11011011011 <- write out digits from the right of the number

1		1
2		1
4		0
8		1
16		1
32		0
64		1
128		1
256		0
512		1
1024	1

1+2+8+16+64+128+512+1024
1755
```
