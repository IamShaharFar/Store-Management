const express = require("express");
const Product = require("../Models/Product");
const Category = require("../Models/Category");
const axios = require("axios");

const router = express.Router();

// List Products endpoint
router.get("/", async (req, res) => {
    try {
      const products = await Product.find({ user_id: "6534129b99745f0add6f96cf" });
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send("Server error");
      console.log(error)
    }
  });

  // List Categories endpoint
router.get("/categories", async (req, res) => {
    try {
      const categories = await Category.find({ user_id: "6534129b99745f0add6f96cf" });
  
      console.log(categories);
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).send("Server error");
      console.log(error)
    }
  });

  router.put("/", async (req, res) => {
    try {
        // Fetch all the products
        const products = await Product.find();
    
        // Create a promise for each product to update its image_url
        const updatePromises = products.map(async (product) => {
          let { image_url } = product;
          
          // Check if "imgur" is present and prepend "i." if it's absent
          if (!image_url.includes('i.imgur')) {
            image_url = image_url.replace('imgur', 'i.imgur');
          }
          
          // Check if the link ends with ".png", append if it's absent
          if (!image_url.endsWith('.png')) {
            image_url += '.png';
          }
    
          // If changes were made, update the product's image_url
          if (product.image_url !== image_url) {
            product.image_url = image_url;
            return product.save(); // Save the updated product
          }
        });
    
        // Execute all the update promises
        await Promise.all(updatePromises);
    
        console.log('All products have been updated successfully.');
    
      } catch (error) {
        console.error('An error occurred while updating the product images:', error);
      }
  })

  async function uploadImageToImgur(imageBuffer) {
    try {
      const imgurResponse = await axios.post(
        "https://api.imgur.com/3/image",
        { image: imageBuffer },
        { headers: { Authorization: "Client-ID 2b8c8f4b12147ec" } }
      );
      return imgurResponse.data.data.link;
    } catch (error) {
      console.error("Error uploading to Imgur:", error.response ? error.response.data : error);
      throw new Error("Imgur upload failed");
    }
  }

  router.post('/add-rom-shivuk', async (req, res) => {
    const imageurls=[
        "https://imgur.com/6ERILMB"//1
        ,"https://imgur.com/1ZDbnFX"//2
        ,"https://imgur.com/WlyfWfm"//3
        ,"https://imgur.com/lHxUMyp"//4
        ,"https://imgur.com/o9tVYLG"//5
        ,"https://imgur.com/KxfYufz"//6
        ,"https://imgur.com/iH0bnO2"//7
        ,"https://imgur.com/8oq4Kfm"//8
        ,"https://imgur.com/ozDzpFN"//9
        ,"https://imgur.com/9ShyKYo"//10
        ,"https://imgur.com/LuJssAt"//11
        ,"https://imgur.com/BWWwRw2"//12
        ,"https://imgur.com/oCl0uCj"//13
        ,"https://imgur.com/zloEif5"//14
        ,"https://imgur.com/Raq5sv6"//15
        ,"https://imgur.com/yrXjBmg"//16
        ,"https://imgur.com/yrXjBmg"//17
    ]
    const products = [
        {
          id: 1,
          name: `תחבושת סני סופר 15 יח' 20/37 ס"מ`,
          description: "",
          categories: [],
          price: "25.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_6fb2cb85f3a749958d9efe09d30cc4ad~mv2.png",
        },
        {
          id: 2,
          name: `(42-44) L "חיתולי שקמה "אובר נייט`,
          description: `שקמה מכנסונים סופגים גזרתי אובר נייט , מידה L
          15 יחידות
          מוצרי ספיגה של שקמה לספיגה מקסימלית ולשמירה על שכבת מגע יבשה
          • לוכדי נוזלים כפולים למניעת נזילות
          • מכנסון אובר נייט של שקמה הוא בעל כושר ספיגה של עד 12 שעות ומתאים לשימוש במהלך הלילה.
          • סגירה רב פעמית: מנגנון סגירה המאפשר סגירה ופתיחה רב פעמיים
          • מגע נושם ואוורירי: שכבה פנימית וחיצונית דמוית`,
          categories: ["תחתונים סופגים", "חיתולים למבוגרים"],
          price: "60.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_a519cf307e304b7d8c12fbbcac616608~mv2.png",
        },
        {
          id: 3,
          name: `(38-40) M "חיתולי שקמה "אובר נייט`,
          description: `שקמה מכנסונים סופגים גזרתי אובר נייט , מידה M
          15 יחידות
          מוצרי ספיגה של שקמה לספיגה מקסימלית ולשמירה על שכבת מגע יבשה
          
          לוכדי נוזלים כפולים למניעת נזילות
          מכנסון אובר נייט של שקמה הוא בעל כושר ספיגה של עד 12 שעות ומתאים לשימוש במהלך הלילה.
          סגירה רב פעמית: מנגנון סגירה המאפשר סגירה ופתיחה רב פעמיים
          מגע נושם ואוורירי: שכבה פנימית וחיצונית דמוית בד, נושמת ואוורירית המעניקה מגע רך ומסייעת במניעת גירויים
          מכנסונים סופגים גזרתיים לשעות היום – לאנשים הזקוקים למוצרים בעלי יכולת ספיגה גבוהה
          מכנסונים סופגים גזרתיים לשעות הלילה – לאנשים הזקוקים לדרגת הספיגה הגבוהה ביותר או לאנשים הנוטלים תרופות משתנות`,
          categories: ["תחתונים סופגים", "חיתולים למבוגרים"],
          price: "60.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_d3b3484eaf654fa2afdb732cebcda828~mv2.jpg",
        },
        {
          id: 4,
          name: "מגבוני מבוגרים נועם 72 יח' XXL",
          description:
            "מגבוני בד גדולים ועבים במיוחד למבוגרים, בניחוח עדין לשמירה על היגיינת הגוף. בתוספת קמומיל וויטמין E, ללא אלכוהול, האריזה כוללת מכסה לסגירה חוזרת לשמירת לחות המגבונים לאורך זמן. מיוצר בישראל.",
          categories: [],
          price: "19.99",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_61c00c77b1084a08825ddc327a839478~mv2.png",
        },
        {
          id: 5,
          name: `קרם לתפרחת חיתולים נועם 1 ק"ג`,
          description:
            "קרם לתפרחת חיתולים וגירויי עור של חברת נועם. מגן על העור. מועשר בויטמין E מועשר באבץ, קלנדולה, קמומיל, שמן זית, שמן חמניות ותמצית פרופוליס. ללא פראבנים, ללא אלכוהול, ללא SLSSLES.",
          categories: [],
          price: "29.99",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_2e660cd81156428abe40f95eae135720~mv2.png",
        },
        {
          id: 6,
          name: `סדיניות נועם חד פעמי 15 יח' 65/95 ס"מ`,
          description: `סדיניות חד פעמיות מלבניות בגודל של 95*65 ס"מ המשמשות כמגן מזרון מעל לסדין, הנוזלים נספגים בתוך הסדיניות וכך ושומרות על המצעים נקיים ויבשים.`,
          categories: [],
          price: "30.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_444be54cfb904f4a842ea93831461486~mv2.png",
        },
        {
          id: 7,
          name: `סדיניות שקמה חד פעמי 15 יח (97/65 ס"מ)`,
          description: `סדיניה לבריחת שתן למבוגרים של שקמה, עשוייה ממשטח חד פעמי המאפשר שמירה על סביבה היגיינית ונעימה. הסדין במידות 65/97 ס"מ, והוא בעל כושר ספיגה גבוה במיוחד ושכבה נושמת ויבשה השומרת על בריאות עורו של האדם היקר בו אתם מטפלים`,
          categories: [],
          price: "40.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_8531eeba8e964cad847bdd92f224793b~mv2.png",
        },
        {
          id: 8,
          name: "תחתון סופג בריז M",
          description:
            "תחתונים סופגים לבריחת שתן, מיוצרים בטכנולוגיה מתקדמת SUPER DRY עם מנגנון לכידת נוזלים, לתחושת יובש והגנה מרבית מנזילות וריחות, אלסטיים להתאמה למבנה הגוף, מאפשרים אורח חיים חופשי ומלא בביטחון. מתאים גם ללילה.",
          categories: ["תחתונים סופגים"],
          price: "65.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_19e855241bdb4aed9e94b84aff2e075f~mv2.jpg",
        },
        {
          id: 9,
          name: "EUROFLEX M תחתונים סופגים",
          description: `תחתונים סופגים למבוגרים חד-פעמיים מבד כותנה רך ונעים תוצרת בלגיה.
          תחתונים בעלי גזרה גבוהה המשלבים בתוכם את הטכנולוגיה החדשנית והעדכנית בתחום הספיגה HydroLock.
          מתאים בעיקר לאנשים בעלי אורח חיים פעיל עם בריחת שתן קלה עד מתונה הרוצים לשמור על עצמאות, דיסקרטיות וביטחון אישי.
          המבנה הגמיש היחודי של התחתון הסופג מותאם בצורה מושלמת לגוף ומונע דליפת שתן לצדדים.
          התחתונים ניתנים להסרה בקלות באמצעות קריעת התפרים הצדדיים.`,
          categories: ["תחתונים סופגים", "מוצרי ספיגה"],
          price: "60.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_ba83b78154dd4e8bb1e544b694d56be9~mv2.png",
        },
        {
          id: 10,
          name: "EUROFLEX XL תחתונים סופגים",
          description: `תחתונים סופגים למבוגרים חד-פעמיים מבד כותנה רך ונעים תוצרת בלגיה.
          תחתונים בעלי גזרה גבוהה המשלבים בתוכם את הטכנולוגיה החדשנית והעדכנית בתחום הספיגה HydroLock.
          מתאים בעיקר לאנשים בעלי אורח חיים פעיל עם בריחת שתן קלה עד מתונה הרוצים לשמור על עצמאות, דיסקרטיות וביטחון אישי.
          המבנה הגמיש היחודי של התחתון הסופג מותאם בצורה מושלמת לגוף ומונע דליפת שתן לצדדים.
          התחתונים ניתנים להסרה בקלות באמצעות קריעת התפרים הצדדיים.`,
          categories: ["תחתונים סופגים", "מוצרי ספיגה"],
          price: "60.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_a8423ebc76fc48a49828cd172bf4e03a~mv2.png",
        },
        {
          id: 11,
          name: "EUROFLEX L תחתונים סופגים",
          description: `תחתונים סופגים למבוגרים חד-פעמיים מבד כותנה רך ונעים תוצרת בלגיה.
          תחתונים בעלי גזרה גבוהה המשלבים בתוכם את הטכנולוגיה החדשנית והעדכנית בתחום הספיגה HydroLock.
          מתאים בעיקר לאנשים בעלי אורח חיים פעיל עם בריחת שתן קלה עד מתונה הרוצים לשמור על עצמאות, דיסקרטיות וביטחון אישי.
          המבנה הגמיש היחודי של התחתון הסופג מותאם בצורה מושלמת לגוף ומונע דליפת שתן לצדדים.
          התחתונים ניתנים להסרה בקלות באמצעות קריעת התפרים הצדדיים.`,
          categories: ["תחתונים סופגים", "מוצרי ספיגה"],
          price: "60.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_3758a36050df4b94b3954dc3a173c808~mv2.png",
        },
        {
          id: 12,
          name: `XL "חיתולים למבוגרים נועם "אול נייט`,
          description: `מכנסוני ספיגה גזרתיים ללילה נועם 15 יחידות
          מכנסוני ספיגה גזרתיים ללילה - בעלי ספיגה מוגברת, דקים ונוחים במיוחד במידה XL.
          מידת מכנסיים: (46-52)
          היקף מותניים: 150-175 ס"מ
          • מערכת סגירה כפולה
          • לכידת נוזלים מתקדמת
          • אלסטיות להתאמה מושלמת
          • בעל מגע רך ונעים
          • ספיגה מוגברת
          • דקים ונוחים במיוחד`,
          categories: ["תחתונים סופגים", "חיתולים למבוגרים"],
          price: "55.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_2a28a22e5946400ea93ac3f9e849305d~mv2.png",
        },
        {
          id: 13,
          name: `L "חיתולים למבוגרים נועם "אול נייט`,
          description: `מכנסוני ספיגה גזרתיים ללילה נועם 15 יחידות
          מכנסוני ספיגה גזרתיים ללילה - בעלי ספיגה מוגברת, דקים ונוחים במיוחד במידה L.
          מידת מכנסיים: (42-44)
          היקף מותניים: 120-150 ס"מ
          • מערכת סגירה כפולה
          • לכידת נוזלים מתקדמת
          • אלסטיות להתאמה מושלמת
          • בעל מגע רך ונעים
          • ספיגה מוגברת
          • דקים ונוחים במיוחד`,
          categories: ["תחתונים סופגים", "חיתולים למבוגרים"],
          price: "55.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_3463f3b274a44fa8a95550352ade8d6f~mv2.png",
        },
        {
          id: 14,
          name: `M "חיתולים למבוגרים נועם "אול נייט`,
          description: `מכנסוני ספיגה גזרתיים ללילה נועם 15 יחידות
          מכנסוני ספיגה גזרתיים ללילה - בעלי ספיגה מוגברת, דקים ונוחים במיוחד במידה M.
          מידת מכנסיים: (38-40)
          היקף מותניים: 80-120 ס"מ
          • מערכת סגירה כפולה
          • לכידת נוזלים מתקדמת
          • אלסטיות להתאמה מושלמת
          • בעל מגע רך ונעים
          • ספיגה מוגברת
          • דקים ונוחים במיוחד`,
          categories: ["תחתונים סופגים", "חיתולים למבוגרים"],
          price: "55.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_8b2a17efeb3945ec977881ca6dbe045f~mv2.png",
        },
        {
          id: 15,
          name: `(46-48) XL "חיתולי שקמה "אובר נייט`,
          description: `שקמה מכנסונים סופגים גזרתי אובר נייט , מידה XL
          15 יחידות
          מוצרי ספיגה של שקמה לספיגה מקסימלית ולשמירה על שכבת מגע יבשה
          • לוכדי נוזלים כפולים למניעת נזילות
          • מכנסון אובר נייט של שקמה הוא בעל כושר ספיגה של עד 12 שעות ומתאים לשימוש במהלך הלילה.
          • סגירה רב פעמית: מנגנון סגירה המאפשר סגירה ופתיחה רב פעמיים
          • מגע נושם ואוורירי: שכבה פנימית וחיצונית דמוית בד, נושמת ואוורירית המעניקה מגע רך ומסייעת במניעת גירויים
          • מכנסונים סופגים גזרתיים לשעות היום – לאנשים הזקוקים למוצרים בעלי יכולת ספיגה גבוהה
          • מכנסונים סופגים גזרתיים לשעות הלילה – לאנשים הזקוקים לדרגת הספיגה הגבוהה ביותר או לאנשים הנוטלים תרופות משתנות`,
          categories: ["תחתונים סופגים", "חיתולים למבוגרים"],
          price: "60.00",
          imgUrl:
            "https://static.wixstatic.com/media/eb6e45_deb6893b54e2418893ce5595f4fb9c77~mv2.png",
        },
        {
          id: 16,
          name: "סינרים חד פעמיים להאכלה 100 יח'",
          description: "",
          categories: [],
          price: "35.00",
          imgUrl: "https://semantic-ui.com/images/wireframe/image.png",
        },
        {
          id: 17,
          name: "כפפות חד פעמיות ניטריל",
          description: "",
          categories: [],
          price: "25.00",
          imgUrl: "https://semantic-ui.com/images/wireframe/image.png",
        },
      ];

      try {
       
        const transformedProducts = products.map((product, index) => ({
          user_id: "6534129b99745f0add6f96cf",
          product_name: product.name,
          product_description: product.description,
          stock_quantity: 0,
          price: parseFloat(product.price),
          barcode: '', // Add barcode if available.
          image_url: imageurls[index], // Using the resolved URL from the promises
          date_added: new Date(),
          categories: [] // Empty array as specified.
        }));
    
        await Product.insertMany(transformedProducts);
        res.status(200).send({ message: "Rom shivuk products added successfully!" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to add sample products" });
      }
  });

  module.exports = router;