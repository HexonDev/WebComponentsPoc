# ASP.NET MVC Web Component Integráció

## Áttekintés

Ez a példa mutatja, hogyan használható a Data Table Web Component ASP.NET MVC környezetben.

## Megközelítések

### 1. Attribútum + Property kombináció (AJÁNLOTT)

**Előnyök:**

- ✅ Server-side rendering (SEO friendly)
- ✅ Kezdeti adatok HTML-be égetve
- ✅ Gyors dinamikus frissítések property-vel

**Használat:**

```cshtml
@* Kezdeti render attribútummal *@
<data-table
    id="myTable"
    columns='@Html.Raw(Json.Serialize(Model.Columns))'
    data='@Html.Raw(Json.Serialize(Model.Data))'>
</data-table>

<script>
    // Dinamikus frissítés property-vel
    const table = document.getElementById('myTable');
    table.data = [newRow, ...table.data];
</script>
```

### 2. Window Property (Alternatíva)

**Előnyök:**

- ✅ Globális konfiguráció
- ✅ Automatikus betöltés
- ✅ Több komponens használhatja

**Használat:**

```cshtml
<script>
    window.tableConfig = {
        columns: @Html.Raw(Json.Serialize(Model.Columns)),
        data: @Html.Raw(Json.Serialize(Model.Data))
    };
</script>

<data-table></data-table>
```

## FONTOS: Miért NEM csak attribútum?

❌ **Csak attribútummal:**

```javascript
// LASSÚ - JSON stringify/parse minden változtatásnál
table.setAttribute('data', JSON.stringify(newData));
```

✅ **Property-vel (ajánlott):**

```javascript
// GYORS - direkt objektum referencia
table.data = newData;
```

## Workflow

1. **Server-side (C#)**: Adatok előkészítése és JSON serialize
2. **Razor View**: Attribútumként vagy window property-ként render
3. **Client-side (JavaScript)**: Dinamikus frissítések property-vel
4. **AJAX**: Új adatok lekérése és property-vel hozzáadása

## AJAX új sor hozzáadás

```javascript
fetch('/api/table/add-row', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newRowData),
})
  .then((response) => response.json())
  .then((newRow) => {
    // Property-alapú frissítés
    table.data = [newRow, ...table.data];
  });
```

## Összefoglalás

**Kezdés**: Attribútum vagy window property (server-side render)  
**Dinamikus változtatások**: Property-alapú frissítés (gyors, hatékony)  
**AJAX integráció**: Fetch + property update
