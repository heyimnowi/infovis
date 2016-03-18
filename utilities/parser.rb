require 'json'

file = File.open('./descriptions.txt', 'r')

def sanitize_word(word)
  word.gsub(/[^0-9A-Za-z]/, '').downcase
end
ans = {}

file.each_line do |line|
  array_line = line.split(' ')
  array_line.each do |word|
    sanitized_word = sanitize_word(word)
    if ans.key?(sanitized_word)
      ans[sanitized_word] += 1
    else
      ans[sanitized_word] = 1
    end
  end
end

File.open('./result.json', 'w+').write(JSON.generate(ans.to_a))