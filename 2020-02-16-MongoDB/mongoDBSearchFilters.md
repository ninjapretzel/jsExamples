# Mongo DB Search Filters

Filters are javascript objects

```js
{}
```
always matches everything

Searching for an exact match is fairly easy, describe the field name and value directly:  
```js
{ username: "Moving-man-23" }
```

Searching probably requires use of __Regular Expressions__.

to match the __beginning of a string__, use the `^` operator  
```js
{ username: /^moving/ }
```
This would act like the windows `moving*` search string

To find something at the end of a string, use the `$` operator  
```js
{ username: /moving$/ }
```  
this would act line the windows `*moving` search string

To match any string containing something,  

```js
{ username: /.*moving.*/ }
```  

this would act like the windows `*moving*` search string. 


say we want to find a username with some substring, containing a number preceded by a dash:  

```js
{ username: /.*mo.*\-\d+.*/ }
```
   
the `.` means "match any character"


the `^` character means 'match the begining of the string', and then we match, verbatim "moving"


to match the existance of a field, there is a special operator, `$exists`  

```js
{ someField: { $exists: true }}
```


