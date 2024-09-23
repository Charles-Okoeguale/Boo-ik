// import React from 'react';
// import { Image, Note, Canvas, Font, Link, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// // Create styles
// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4',
//         minHeight: '100vh',
//         minWidth: '100vw'
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     }
// });

// const TestRender = (output) => {
//     console.log("TestRender", output)
// };

// const hyphenationCallback = (word) => {
//     return word.replace(/([aeiouy])(?=[^aeiouy])/gi, '$1-').split('-');
// };

// const drawRectangle = (canvas, width, height) => {
//     console.log("Canvas ", canvas);
//     console.log("width ", width);
//     console.log("height ", height);
//     canvas.fillColor('blue');
//     canvas.text('Here is a link!', 100, 100);
// };

// Font.registerHyphenationCallback(hyphenationCallback);

// // Create Document Component
// export const ReactPdfDocument = () => {
//     return (
//         <Document
//             title='TestTitle'
//             author='TestAuthor'
//             subject='TestSubject'
//             keywords='TestKeywords'
//             creator='TestCreator'
//             producer='TestProducer'
//             pdfVersion='TestVersion'
//             language='TestLanguage'
//             pageMode='fullScreen'
//             pageLayout='singlePage'
//             onRender={TestRender}
//         >
//             <Page size="A4" style={styles.page} wrap={true}
//                 orientation='landscape'>
//                 <View style={styles.section}>
//                     <Link src='#Section1'>
//                         Section
//                     </Link>
//                 </View>
//                 <View style={styles.section}>
//                     <Text>Section 2</Text>
//                 </View>
//             </Page>
//             <Page debug size="A4" style={styles.page} wrap={true}
//                 orientation='portrait'>
//                 <View style={styles.section}>
//                     <Link src='#Section1'>
//                         Section
//                     </Link>
//                 </View>
//                 <View style={styles.section}>
//                     <Text>Section 2</Text>
//                 </View>
//             </Page>
//             <Page dpi={100}>
//                 <View id='Section1' orphans={2} widows={2} minPresenceAhead={10}>
//                     <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
//                 </View>
//             </Page>
//             <Page bookmark="Harry Potter and the Philosopher's Stone">
//                 <Text bookmark={{ title: "Chapter 1: The Boy Who Lived", fit: true }}>
//                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
//                 <Text render={({ pageNumber, totalPages, subPageNumber, subPageTotalPages }) => (
//                     `\n\n${pageNumber} / ${totalPages} \n` +
//                     `${subPageNumber} / ${subPageTotalPages}`
//                 )} fixed />
//             </Page>
//             <Page>
//                 <Note fixed>
//                     <Text>This is a note annotation</Text>
//                 </Note>
//                 <Image
//                     cache
//                     src='https://picsum.photos/100'
//                     style={{ height: '100px', width: '100px' }}
//                 />
//             </Page>
//             <Page>
//                 <Canvas
//                     debug
//                     paint={drawRectangle}
//                     fixed
//                     bookmark="CanvasTest"
//                     style={{ height: '100vh', width: '100%' }}
//                 ></Canvas>
//             </Page>
//         </Document>
//     );
// }