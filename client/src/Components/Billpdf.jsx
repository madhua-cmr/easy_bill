
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
const styles=StyleSheet.create({
    page:{padding:20},
    section:{marginBottom:10},
    title:{fontSize:18,textAlign:"center",fontWeight:"bold"},
    text:{fontSize:12,marginBottom:5},
    table:{display:"table",width:"100%",borderStyle:"solid",borderWidth:1},
    row:{flexDirection:"row"},
    cell:{borderStyle:"solid",borderWidth: 1, padding: 5, flex: 1, textAlign: "center" },

})
const Billpdf = ({bill}) => {
    return(
<Document>
<Page size="A4" style={styles.page}>
    <View style={styles.section}>
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.title}>Date:{bill?.billDate?.split("T")[0]}</Text>
        <Text style={styles.title}>Bill No:{bill?.billNumber}</Text>
        <Text style={styles.title}>Customer:{bill?.customerId?.name}</Text>
    </View>
    <View style={styles.table}>
        <View style={[styles.row,{backgroundColor:'#ddd'}]}>
            <Text style={styles.cell}>Code</Text>
            <Text style={styles.cell}>Vegetable</Text>
            <Text style={styles.cell}>Rate</Text>
            <Text style={styles.cell}>Units</Text>
            <Text style={styles.cell}>Amount</Text>

        </View>
        

        {bill?.items?.map((item,index)=>(
            <View key={index} style={styles.row}>
  <Text style={styles.cell}>{item.code.uniquecode}</Text>
  <Text style={styles.cell}>{item.code.name}</Text>  
  <Text style={styles.cell}>{item.rate}</Text>  
  <Text style={styles.cell}>{item.units}</Text> 
  <Text style={styles.cell}>{item.rate * item.units}</Text>
             </View>
        ))}

<View style={styles.section}>
  <Text style={styles.text}>Total Amount : {bill?.totalAmount || 0}</Text>
  <Text style={styles.text}>Paid Amount : {bill?.paid || 0}</Text>
  <Text style={styles.text}>Balance Amount : {(bill?.totalAmount || 0) - (bill?.paid || 0)}</Text>
</View>
    </View>
</Page>
</Document>
    )
}

export default Billpdf
