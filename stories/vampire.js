window.STORY_VAMPIRE = {
  title: "A Very Polite Vampire",
  subtitle: "第三人稱敘述 · 以吸血鬼 Victor 的行動作為選擇",
  startNode: "V1",
  endNodes: ["V26", "V27", "V28", "V29", "V30"],
  layers: [["V1"], ["V2", "V3", "V4"], ["V5", "V6", "V7", "V8", "V9"], ["V10", "V11", "V12", "V13", "V14", "V15"], ["V16", "V17", "V18", "V19", "V20"], ["V21", "V22", "V23", "V24", "V25"], ["V26", "V27", "V28", "V29", "V30"]],
  nodes: [
    { id: "V1", text: `小鎮的夜晚靜得過分。新搬來的吸血鬼 Victor 站在廚房中央，看著空空如也的櫃子。他並不是一定要血——至少他自己是這樣說服自己的。番茄汁，或者任何紅色飲料，都可以暫時替代。

隔壁住著一位19歲的女孩 Mary。她看起來友善、正常，而且顯然擁有一個有存貨的廚房。`, choices: [{ to: "V2", text: "讓 Victor 直接去敲 Mary 的門，禮貌地借番茄汁" }, { to: "V3", text: "讓 Victor 先觀察 Mary 的生活作息，確保自己不會嚇到她" }, { to: "V4", text: "讓 Victor 先練習人類的對話方式，再決定怎麼開口" }] },
    { id: "V2", text: `Victor 站在 Mary 的門前，確認自己的獠牙沒有露出，然後敲門。

Mary 打開門，看著他蒼白的臉與刻意擠出的微笑，略微停頓了一下。

「嗨，我是新鄰居，可以借一點番茄汁嗎？」Victor 說。

Mary 眨了眨眼：「現在是晚上九點。」`, choices: [{ to: "V5", text: "讓 Victor 嘗試用『只是夜間作息』來合理解釋自己的行為" }, { to: "V6", text: "讓 Victor 假裝自己是夜班工作者" }] },
    { id: "V3", text: `Victor 躲在窗簾後觀察 Mary。他發現她白天活動、晚上休息，作息規律得令人羨慕。不幸的是，Mary 很快就注意到對面窗簾後有個奇怪的影子，並朝他揮手。`, choices: [{ to: "V6", text: "讓 Victor 立刻尷尬地揮手打招呼" }, { to: "V7", text: "讓 Victor 假裝自己只是在看星星" }] },
    { id: "V4", text: `Victor 對著鏡子練習說話，但很快發現鏡子裡沒有任何東西。

他停了一下，點點頭：「對，我忘了這點。」`, choices: [{ to: "V7", text: "讓 Victor 放棄練習，直接去找 Mary" }, { to: "V8", text: "讓 Victor 繼續準備一段更安全的說詞" }] },
    { id: "V5", text: `Victor 試著解釋自己的作息問題。Mary 聽完後點點頭：「所以你只是晚上比較有精神？」Victor 非常認真地點頭。Mary 笑了笑：「那你應該很適合幫我搬東西。」`, choices: [{ to: "V10", text: "讓 Victor 答應幫忙，換取建立關係的機會" }, { to: "V11", text: "讓 Victor 試著把話題拉回『番茄汁』" }] },
    { id: "V6", text: `Victor 說自己是夜班工作者。Mary 顯得稍微放鬆了一點。「那你應該很累。」她說。Victor 點頭，但內心其實在想他已經幾百年沒睡過覺。`, choices: [{ to: "V10", text: "讓 Victor 順勢聊天" }, { to: "V12", text: "讓 Victor 再次嘗試借東西" }] },
    { id: "V7", text: `Mary 覺得這位新鄰居有點奇怪，但並沒有感到害怕。她甚至露出一點好奇的表情。`, choices: [{ to: "V12", text: "讓 Victor 直接提出借東西的請求" }, { to: "V13", text: "讓 Victor 先嘗試建立信任與聊天" }] },
    { id: "V8", text: `Victor 準備了一段聽起來非常『人類』的台詞，但實際講出來時有點像在背稿。`, choices: [{ to: "V13", text: "讓 Victor 改用自然方式" }, { to: "V12", text: "讓 Victor 照稿念" }] },
    { id: "V9", text: `Victor 一度考慮寫紙條，但他意識到這只會讓自己顯得更可疑。`, choices: [{ to: "V12", text: "還是讓 Victor 當面開口借東西" }, { to: "V13", text: "讓 Victor 先聊幾句再進入正題" }] },
    { id: "V10", text: `Victor 搬東西時表現出過於誇張的力量。Mary 看著他單手抬起沉重箱子，眉毛慢慢挑了起來。`, choices: [{ to: "V14", text: "讓 Victor 嘗試解釋自己只是平常有在訓練" }, { to: "V15", text: "讓 Victor 趕快轉移話題，不讓 Mary 繼續往下想" }] },
    { id: "V11", text: `Victor 試圖把話題拉回番茄汁，卻越說越像在隱瞞什麼。`, choices: [{ to: "V15", text: "讓 Victor 換個輕鬆話題" }, { to: "V16", text: "讓 Victor 放棄這次社交，先撤回自己家裡" }] },
    { id: "V12", text: `Mary 最後真的遞給 Victor 一瓶番茄汁。Victor 接過瓶子時，神情認真得像收到某種正式援助。`, choices: [{ to: "V17", text: "讓 Victor 真誠地向 Mary 表達感謝" }, { to: "V18", text: "讓 Victor 趁機再借點別的東西" }] },
    { id: "V13", text: `兩人開始聊起小鎮、搬家與夜晚的安靜。Mary 漸漸覺得 Victor 雖然怪，卻不是討厭的那種怪。`, choices: [{ to: "V17", text: "讓 Victor 繼續順著這份輕鬆氣氛聊下去" }, { to: "V18", text: "讓 Victor 把話題慢慢轉回借東西" }] },
    { id: "V14", text: `Mary 開始懷疑 Victor 的說詞，但她還沒有完全失去耐心。`, choices: [{ to: "V19", text: "讓 Victor 嘗試用更自然的方式挽回局面" }] },
    { id: "V15", text: `Victor 的轉移話題略顯生硬，Mary 雖然沒有拆穿他，卻明顯記住了那一瞬間的不對勁。`, choices: [{ to: "V19", text: "讓 Victor 趁局面還沒壞到底之前試著挽回" }] },
    { id: "V16", text: `Victor 決定先撤退回家。他至少借到了東西，雖然整場互動留下不少尷尬。`, choices: [{ to: "V26", text: "讓這次拜訪以普通但安全的方式收尾" }] },
    { id: "V17", text: `Mary 開始覺得 Victor 其實挺有趣，只是和一般人相比，某些習慣實在太奇怪了一點。`, choices: [{ to: "V20", text: "讓 Victor 慢慢建立鄰居關係" }] },
    { id: "V18", text: `Victor 再借更多東西的舉動讓 Mary 的好奇心開始往懷疑滑動。番茄汁可以理解，接著又問有沒有番茄醬、紅色果醬，甚至問了「你家有沒有比較厚的窗簾」，這就很難不讓人多想。`, choices: [{ to: "V21", text: "讓 Victor 正面面對 Mary 的懷疑" }, { to: "V24", text: "讓 Victor 繼續亂補可疑理由，把疑點堆成災難" }] },
    { id: "V19", text: `氣氛變得微妙。Victor 必須把自己的怪控制在『有趣』而不是『需要報警』的範圍內。`, choices: [{ to: "V21", text: "讓 Victor 繼續面對 Mary 的疑問" }, { to: "V24", text: "讓 Victor 再多說幾句自以為聰明的解釋" }, { to: "V25", text: "讓 Victor 用自嘲和笨拙幽默化解尷尬" }] },
    { id: "V20", text: `Victor 與 Mary 逐漸建立起一種帶著奇妙節奏的鄰居友誼。`, choices: [{ to: "V26", text: "讓這段關係以溫和方式收束成好開端" }] },
    { id: "V21", text: `Mary 看著 Victor，像是終於把前面所有細節串了起來。Victor 知道，自己再往前一步，可能就是坦白、逃跑，或徹底出糗。`, choices: [{ to: "V22", text: "讓 Victor 主動坦白自己是吸血鬼" }, { to: "V23", text: "讓 Victor 在局面失控前先撤回家裡" }, { to: "V25", text: "讓 Victor 用誠懇又笨拙的幽默化解張力" }] },
    { id: "V22", text: `Victor 最後選擇坦白。他盡可能平靜而禮貌地說出真相，並補上一句自己其實更喜歡番茄汁。`, choices: [{ to: "V27", text: "看看 Mary 是否能接受這件荒謬卻無害的真相" }] },
    { id: "V23", text: `Victor 選擇撤退。他回到自己屋裡，靠著門板站了幾秒，懷疑自己剛剛是不是把鄰里關係搞砸了。`, choices: [{ to: "V28", text: "讓這次社交嘗試以失敗收場" }] },
    { id: "V24", text: `一連串誤會疊加後，事情開始往滑稽災難方向發展。Mary 的表情已經介於困惑、警覺與想笑之間。`, choices: [{ to: "V29", text: "讓 Victor 繼續硬撐那些越來越站不住腳的藉口" }] },
    { id: "V25", text: `Victor 與 Mary 的對話在尷尬與笑點之間反覆搖擺，竟慢慢走向一種奇妙的和諧。`, choices: [{ to: "V30", text: "讓 Victor 把這場古怪互動收成 happy ending" }] },
    { id: "V26", text: `結局：Victor 沒有暴露真正身分，也成功在 Mary 心裡留下還算不錯的鄰居印象。`, choices: [] },
    { id: "V27", text: `結局：Mary 花了一點時間消化新鄰居是吸血鬼這件事，但最後接受了 Victor。前提是他以後要先敲門，不要深夜站在窗外。`, choices: [] },
    { id: "V28", text: `結局：Victor 的第一次鄰里交流以社交失敗告終。Mary 之後看見他時，眼神裡多了一點觀察距離。`, choices: [] },
    { id: "V29", text: `結局：誤會一路失控，從奇怪作息、誇張力氣到無法自圓其說的藉口，全都疊成小型災難。`, choices: [] },
    { id: "V30", text: `結局：Mary 一邊笑 Victor 的笨拙，一邊把番茄汁塞給他。Victor 第一次覺得，搬來這個小鎮也許真的是不錯的決定。`, choices: [] }
  ]
};
