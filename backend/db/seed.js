const { getDb } = require('./init')

function seedDb() {
  const db = getDb()
  const count = db.prepare('SELECT COUNT(*) as c FROM posts').get()
  if (count.c > 0) return

  const posts = [
    {
      title: 'Bí Quyết Chọn Trang Phục Cho Buổi Chụp Ảnh Cưới',
      slug: 'bi-quyet-chon-trang-phuc-chup-anh-cuoi',
      excerpt: 'Trang phục là yếu tố quan trọng quyết định phong cách và cảm xúc của bộ ảnh cưới. Cùng Lumière khám phá những bí quyết giúp bạn tỏa sáng trong từng khung hình.',
      content: `<p>Chọn trang phục phù hợp cho buổi chụp ảnh cưới là một trong những bước chuẩn bị quan trọng nhất mà nhiều cặp đôi thường bỏ qua. Không chỉ cần đẹp, trang phục còn cần phải phù hợp với concept, địa điểm và ánh sáng của buổi chụp.</p>
<h2>1. Phù Hợp Với Concept Chụp Ảnh</h2>
<p>Trước khi chọn trang phục, hãy thảo luận với nhiếp ảnh gia về concept tổng thể của bộ ảnh. Nếu bạn muốn chụp theo phong cách vintage, những chiếc váy xòe dài với tông màu kem hoặc ivory sẽ là lựa chọn hoàn hảo. Với phong cách hiện đại, minimalist dress với đường cắt sạch sẽ mang đến vẻ thanh lịch đặc trưng.</p>
<h2>2. Tông Màu Phối Hợp</h2>
<p>Hãy đảm bảo màu trang phục của cô dâu và chú rể có sự hài hòa. Không nhất thiết phải cùng màu, nhưng cần có sự liên kết về tông màu. Ví dụ: váy trắng ngà cô dâu sẽ hợp với vest xám nhẹ hoặc xanh navy của chú rể hơn là vest đen đậm.</p>
<h2>3. Chất Liệu Và Chuyển Động</h2>
<p>Những chất liệu nhẹ như chiffon, silk hay organza sẽ tạo ra những chuyển động đẹp trong ảnh, đặc biệt là khi chụp ngoài trời có gió. Đây là chi tiết nhỏ nhưng tạo ra sự khác biệt rất lớn trong bộ ảnh cuối cùng.</p>
<p>Hãy thử mặc trang phục và di chuyển trong đó trước khi quyết định. Trang phục đẹp nhưng không thoải mái sẽ ảnh hưởng đến biểu cảm tự nhiên của bạn trong ảnh.</p>`,
      image_url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
      category: 'tips',
      author: 'Nguyễn Minh Khoa'
    },
    {
      title: 'Hậu Trường Buổi Chụp Ảnh Kỷ Yếu Mùa Hè 2024',
      slug: 'hau-truong-chup-ky-yeu-2024',
      excerpt: 'Cùng nhìn lại những khoảnh khắc thú vị đằng sau ống kính trong mùa chụp kỷ yếu sôi động nhất năm. Từ những ý tưởng concept độc đáo đến những nụ cười rạng rỡ của các bạn học sinh.',
      content: `<p>Mùa kỷ yếu 2024 vừa khép lại với những kỷ niệm đẹp khó quên. Lumière Studio đã có vinh dự đồng hành cùng hàng chục lớp học từ khắp TP. Hồ Chí Minh, từ những trường THPT danh tiếng đến các trường đại học hàng đầu.</p>
<h2>Concept Phong Phú, Sáng Tạo</h2>
<p>Năm nay, xu hướng chụp kỷ yếu đã có nhiều thay đổi thú vị. Thay vì chỉ chụp trong studio với phông nền đơn giản, nhiều lớp đã lựa chọn những địa điểm độc đáo như vườn hoa, bãi biển, hay thậm chí là những con phố cổ kính giữa lòng thành phố.</p>
<h2>Đội Ngũ Chuyên Nghiệp, Tâm Huyết</h2>
<p>Để mỗi bộ ảnh kỷ yếu thực sự ý nghĩa, đội ngũ Lumière đã làm việc không mệt mỏi từ khâu tư vấn concept, hỗ trợ makeup và styling, đến quá trình chụp và hậu kỳ. Đối với chúng tôi, mỗi bộ ảnh kỷ yếu không chỉ là công việc mà còn là một phần ký ức của thế hệ trẻ.</p>
<p>Chúng tôi trân trọng sự tin tưởng mà các bạn học sinh và phụ huynh đã dành cho Lumière. Đây là động lực để chúng tôi tiếp tục phấn đấu và sáng tạo hơn nữa trong những mùa kỷ yếu tới.</p>`,
      image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
      category: 'behind',
      author: 'Lê Thanh Hương'
    },
    {
      title: '5 Địa Điểm Chụp Ảnh Đẹp Nhất Tại TP. Hồ Chí Minh',
      slug: '5-dia-diem-chup-anh-dep-tai-tphcm',
      excerpt: 'Thành phố Hồ Chí Minh ẩn chứa vô vàn địa điểm chụp ảnh tuyệt vời, từ những góc phố cổ kính đến những tòa nhà hiện đại. Hãy cùng khám phá top 5 địa điểm yêu thích của Lumière.',
      content: `<p>TP. Hồ Chí Minh không chỉ là thành phố năng động mà còn là kho tàng vô tận cho những ai yêu nhiếp ảnh. Sau nhiều năm ghi lại những khoảnh khắc tại đây, đội ngũ Lumière muốn chia sẻ những địa điểm chụp ảnh yêu thích nhất.</p>
<h2>1. Phố Đi Bộ Nguyễn Huệ</h2>
<p>Với những tòa nhà kiến trúc Pháp cổ điển và ánh đèn lung linh về đêm, phố Nguyễn Huệ là thiên đường cho những bộ ảnh urban và contemporary. Thời điểm đẹp nhất là golden hour khi ánh hoàng hôn phản chiếu lên những tòa nhà kính.</p>
<h2>2. Nhà Thờ Đức Bà</h2>
<p>Công trình kiến trúc Gothic này không bao giờ lỗi thời với ống kính máy ảnh. Sân nhà thờ với những hàng cây xanh và không gian yên tĩnh tạo nên backdrop hoàn hảo cho ảnh cưới hay ảnh cá nhân lãng mạn.</p>
<h2>3. Bến Bạch Đằng & Sông Sài Gòn</h2>
<p>View sông Sài Gòn với những con tàu và ánh đèn đêm phản chiếu mặt nước tạo nên khung cảnh romantique không thể tìm thấy ở đâu khác. Đặc biệt đẹp vào lúc hoàng hôn và đầu đêm.</p>
<h2>4. Làng Đại Học Thủ Đức</h2>
<p>Với không gian xanh mát, những con đường rợp bóng cây và kiến trúc học thuật đặc trưng, khu đại học Thủ Đức là lựa chọn hoàn hảo cho ảnh kỷ yếu và ảnh sinh viên.</p>
<h2>5. Biệt Thự Cổ Quận 3</h2>
<p>Những con phố với hàng biệt thự Pháp cổ kính ở Quận 3 mang đến không khí hoài cổ và sang trọng khó lẫn. Đây là backdrop lý tưởng cho những bộ ảnh cưới theo phong cách vintage hay editorial.</p>`,
      image_url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
      category: 'inspiration',
      author: 'Phạm Anh Tuấn'
    },
    {
      title: 'Cách Chuẩn Bị Cho Buổi Chụp Ảnh Cá Nhân Chuyên Nghiệp',
      slug: 'chuan-bi-chup-anh-ca-nhan-chuyen-nghiep',
      excerpt: 'Buổi chụp ảnh cá nhân đầu tiên có thể khiến nhiều người lo lắng. Đừng lo, Lumière sẽ chia sẻ những bí quyết giúp bạn tự tin và tỏa sáng trước ống kính.',
      content: `<p>Chụp ảnh cá nhân ngày càng trở nên phổ biến, không chỉ cho mục đích personal branding mà còn để lưu giữ những khoảnh khắc đẹp nhất của cuộc đời. Dưới đây là những gợi ý từ đội ngũ Lumière để buổi chụp của bạn thực sự thành công.</p>
<h2>Trước Buổi Chụp</h2>
<p>Ngủ đủ giấc và uống đủ nước trong 2-3 ngày trước buổi chụp. Da sẽ trông khỏe mạnh và rạng rỡ hơn nhiều khi bạn được nghỉ ngơi tốt. Tránh ăn những thực phẩm gây phù nề như đồ mặn, đồ uống có cồn.</p>
<h2>Trang Phục: Chuẩn Bị Nhiều Lựa Chọn</h2>
<p>Mang theo ít nhất 3-4 outfit với phong cách khác nhau: một set formal, một set casual và một set có thể là evening wear. Đảm bảo trang phục được là phẳng và sạch. Tránh những họa tiết kẻ sọc nhỏ hoặc chấm bi dày vì chúng tạo ra hiệu ứng ảo giác khó chịu trong ảnh.</p>
<h2>Trong Buổi Chụp</h2>
<p>Hãy thư giãn và tin tưởng vào nhiếp ảnh gia. Những khoảnh khắc tự nhiên nhất thường xảy ra khi bạn không cố gắng tạo dáng. Hãy nói chuyện, cười đùa và để cảm xúc chân thực nhất xuất hiện.</p>
<p>Đừng ngại yêu cầu xem lại ảnh trong quá trình chụp để điều chỉnh. Một nhiếp ảnh gia tốt luôn hoan nghênh sự phản hồi từ khách hàng.</p>`,
      image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
      category: 'tips',
      author: 'Lê Thanh Hương'
    }
  ]

  const insert = db.prepare(`
    INSERT INTO posts (title, slug, excerpt, content, image_url, category, author)
    VALUES (@title, @slug, @excerpt, @content, @image_url, @category, @author)
  `)

  const insertMany = db.transaction((items) => {
    for (const item of items) insert.run(item)
  })

  insertMany(posts)
  console.log('Blog posts seeded.')
}

module.exports = { seedDb }
