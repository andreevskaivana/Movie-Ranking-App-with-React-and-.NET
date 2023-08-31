namespace RankingApp.Models
{
    public class ItemModel
    {
        public int Id {get;set;}
        public string Title {get;set;}  
        //each item has an associated image -> item = one image
        //one to one relation with image
        public int ImageId { get;set;}

        //ranking value to an item
        public int Ranking { get;set;}

        //item type(movie=1,album=2
        //one to many relation with items 
        public int ItemType { get; set; }
    }
}
