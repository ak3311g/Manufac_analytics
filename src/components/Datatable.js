export default function DataTable(data, value){

  console.log(data)

    return(
        <table border={"1px"}>
          <thead>
            <tr>
              <th>Measure</th>
              {
                data[0].map(item => (
                  <th key={item.class}>Class {item.class}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>Flavonoids Mean</td>
              {
                data.map(item => (
                  <td key={item.class}>{item.flavanoids.mean}</td>
                ))
              }
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Flavonoids Mean</td>
              {
                data.map(item => (
                  <td key={item.class}>{item.flavanoids.median}</td>
                ))
              }
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Flavonoids Mean</td>
              {
                data.map(item => (
                  <td key={item.class}>{item.flavanoids.mode}</td>
                ))
              }
            </tr>
          </tbody>
        </table>
    )
}