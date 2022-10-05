import React from "react";
import { ScrollView, Image, View } from "react-native";
import { Text, FastImage } from "../../components";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
// import metrix from "../../config/metrix";

function Index(props) {
  return (
    <ScrollView>
      <View style={styles.Viewcontainer}>
        <Text style={styles.headingText}>Leather Care</Text>
        <View style={styles.contentPadding}>
          <FastImage source={IMAGES.leather} Imagestyle={styles.newsImg} />
          <Text style={styles.subheadingText}>
            With five generations of experience with leather, we ensure the
            selection of the finest quality of leather that is combined with
            premium metal accessories and designed with unmatched craftsmanship.
            With our trademark of high quality, our products are conceived and
            designed to be passed down generations.
          </Text>
          <Text style={styles.subheadingText}>
            Wear and tear is expected; if your product requires any form of
            services, please note we have our own in-house leather care facility
            where your products can receive the deserved spa treatment it
            requires! You will be provided with a quotation in regards to the
            work to be rendered.
          </Text>
          <Text style={styles.subheadingText}>
            Leather is a natural material! Each hide has its own characteristic
            and an identity. With use, the leather will show slight color and
            grain variations, which promises the authenticity of the article.
            Because we use natural material, it is recommended that you give
            regular resting periods of non-use to extend the lifetime of your
            item.
          </Text>
          <View style={styles.greybox}>
            <Image source={IMAGES.productclean} style={styles.innerImg} />
            <Text style={styles.header}>Keep Your Product Clean</Text>
            <Text style={[styles.subheadingText, { textAlign: "center" }]}>
              Our products should be cleaned with a soft, dry cloth. If
              possible, every other day, give your product a brisk sweep!
            </Text>
          </View>
          <View style={styles.greybox}>
            <Image source={IMAGES.usage} style={styles.innerImg} />
            <Text style={styles.header}>Usage</Text>
            <Text style={[styles.subheadingText, { textAlign: "center" }]}>
              Do not carry anything excessively heavy that could alter the shape
              of the material. Also remove unwanted receipts from your wallets
              so that it retains its shape. Once leather is deformed or loses
              shape, it cannot be restored to its original size.
            </Text>
          </View>
          <View style={styles.greybox}>
            <Image source={IMAGES.soapwater} style={styles.innerImg} />
            <Text style={styles.header}>Soap & Water</Text>
            <Text style={[styles.subheadingText, { textAlign: "center" }]}>
              It is our personal recommendation that any form of detergents,
              soap and water mixes not be used to clean your product. These can
              and will damage your leather product.
            </Text>
          </View>
          <View style={styles.greybox}>
            <Image source={IMAGES.storage} style={styles.innerImg} />
            <Text style={styles.header}>Storage</Text>
            <Text style={[styles.subheadingText, { textAlign: "center" }]}>
              It is our personal recommendation that any form of detergents,
              soap and water mixes not be used to clean your product. These can
              and will damage your leather product.
            </Text>
          </View>
          <View style={styles.greybox}>
            <Image source={IMAGES.leatherwater} style={styles.innerImg} />
            <Text style={styles.header}>Water & Leather</Text>
            <Text style={[styles.subheadingText, { textAlign: "center" }]}>
              Our leather is processed to take spills from water. However, we
              would advise that you avoid getting your product wet. If water
              does spill on the leather, wipe it with a clean dry cloth to
              prevent water marks and allow it to dry naturally.
            </Text>
          </View>
          <View style={styles.greybox}>
            <Image source={IMAGES.cream} style={styles.innerImg} />
            <Text style={styles.header}>Creams & Polishes</Text>
            <Text style={[styles.subheadingText, { textAlign: "center" }]}>
              We recommend that your product be sent to us if you would like to
              keep it supple. Using high replenish creams and polishes can be
              recommended, but the amount used requires careful consideration as
              it can easily lighten or darken the color of your product.
            </Text>
          </View>

          <Image source={IMAGES.leatherbag} style={styles.newsImg} />
          <Text style={styles.subheadingText}>
            Something that is usually not discussed is the affect extreme
            weather change has on leather. If the weather becomes too dry, the
            leather could become stiff and brittle which can cause cracking.
            Conversely, if leather is exposed to very high humidity, it could
            potentially grow mold, and cause white spots on the leather and
            cause metal accessories to tarnish. Extreme sunlight exposure could
            cause change in color and stiffen the leather which in turn usually
            causes deformity in the product. Hence, it is recommended that you
            keep your leather product in a cool dry place, away from extremes of
            temperature or humidity.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Index;
