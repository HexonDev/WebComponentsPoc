using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace YourNamespace.Controllers
{
    public class TableController : Controller
    {
        // GET: Táblázat oldal megjelenítése
        public IActionResult Index()
        {
            var model = new TableViewModel
            {
                Columns = new List<TableColumn>
                {
                    new TableColumn { Key = "id", Label = "ID", Sortable = true },
                    new TableColumn { Key = "name", Label = "Név", Sortable = true },
                    new TableColumn { Key = "email", Label = "E-mail", Sortable = true },
                    new TableColumn { Key = "role", Label = "Szerepkör", Sortable = true }
                },
                Data = new List<Dictionary<string, object>>
                {
                    new Dictionary<string, object>
                    {
                        { "id", 1 },
                        { "name", "Kovács János" },
                        { "email", "kovacs.janos@example.com" },
                        { "role", "Admin" }
                    },
                    new Dictionary<string, object>
                    {
                        { "id", 2 },
                        { "name", "Nagy Anna" },
                        { "email", "nagy.anna@example.com" },
                        { "role", "Felhasználó" }
                    }
                }
            };

            return View(model);
        }

        // POST: Új sor hozzáadása AJAX-szal
        [HttpPost]
        [Route("api/table/add-row")]
        public IActionResult AddRow([FromBody] Dictionary<string, object> newRowData)
        {
            // Itt történik a backend logika - pl. adatbázisba mentés
            // Példa új sor generálás:
            var newRow = new Dictionary<string, object>
            {
                { "id", GetNextId() },
                { "name", newRowData.ContainsKey("name") ? newRowData["name"] : "Új felhasználó" },
                { "email", newRowData.ContainsKey("email") ? newRowData["email"] : "email@example.com" },
                { "role", newRowData.ContainsKey("role") ? newRowData["role"] : "Felhasználó" }
            };

            // Visszaadjuk JSON-ként
            return Json(newRow);
        }

        private int GetNextId()
        {
            // Valódi implementációban adatbázisból jönne
            return new Random().Next(100, 999);
        }
    }

    // View Model
    public class TableViewModel
    {
        public List<TableColumn> Columns { get; set; }
        public List<Dictionary<string, object>> Data { get; set; }
    }

    public class TableColumn
    {
        public string Key { get; set; }
        public string Label { get; set; }
        public bool Sortable { get; set; }
    }
}
