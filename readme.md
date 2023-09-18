# Protobuf Viewer

This protobuf viewer is intended to be used with the mobile game Beatstar.

Beatstar doesn't follow traditional protobuf guidelines. While most things are unchanged Beatstar uses a `type` field at times to indicate which group to use which means groups may have different names for the same key.

This repo exports 3 items: ProtobufReader, ProtobufWriter and CMSRequester.

## Reading Protobufs

```const buffer: Buffer = fs.readFileSync('...');
const reader = new ProtobufReader(buffer);
reader.raw() // prints an attempted deconstruction of the protobuf
const data = reader.process(proto)
```

Proto should be an object containing a mapping of keys to types such as

```
{
  "1": {
    "name": "id",
    "type": "varint"
  }
}
```

## Writing Protobufs

```
const data = { id: 1 };
const writer = new ProtobufWriter(data);
const built = writer.build(proto)
```

Proto again should be an object as described above.

## Reading CMS

To read the CMS files there are two methods.

`CMSRequester.getCms()` will return a list of CMS files and their links to download as protobuf files.

Some protobufs (NewsFeed, LiveOpsBundleConfig, LiveOpsDeeplinkRewardConfig, LiveOpsEventConfig and LiveOpsSeasonConfig) are retrieved during the login process and need to be fetched separately. This can be done with the following:

`CMSRequester.getExtraCms()`

This will return the CMS files in a parsed form.

# To quickly run this

1. Clone this repo
2. Open a terminal in the cloned folder and `npm install` to get dependencies
3. Edit `index.ts` and add your code above the export

As an example we'll use

```
import ProtobufReader from "./ProtobufReader";
import ProtobufWriter from "./ProtobufWriter";
import * as CMSRequester from "./server/CMSRequester";

type CMS =
  | "GameConfig"
  | "LangConfig"
  | "AssetsPatchConfig"
  | "AudioConfig"
  | "NewsFeed"
  | "ScalingConfig"
  | "NotificationsConfig"
  | "FontFallbackConfig"
  | "LiveOpsBundleConfig"
  | "LiveOpsEventConfig"
  | "LiveOpsDeepLinkRewardConfig"
  | "SongConfig";

CMSRequester.getExtraCms();

export { ProtobufReader, ProtobufWriter, CMSRequester };
```

4. Save the file
5. Open a terminal in the same folder as `index.ts`
6. Run `npm run dev`

If you're running `CMSRequester.getCms()` you'll see a list of the names and links to the raw CMS files in the terminal.
If you're running `CMSRequester.getExtraCms()` you'll find the downloaded parsed CMS files in the `fetched` folder.
