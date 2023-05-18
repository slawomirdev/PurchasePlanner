using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.EFCore
{
    [Table("product")]

    public class product
    {
        [Key, Required]
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public int Size { get; set; } 
        public decimal Price { get; set; }


    }
}
